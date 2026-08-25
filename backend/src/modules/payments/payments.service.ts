import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Transaction } from './entities/transaction.entity';
import { TransactionRefund } from './entities/transaction-refund.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { OrderEvent } from '../orders/entities/order-event.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';
import { StripeService } from './stripe.service';

const ORDER_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['paid', 'cancelled'],
  paid: ['preparing', 'cancelled'],
  preparing: ['shipped'],
  shipped: ['in_transit'],
  in_transit: ['delivered'],
  delivered: ['returned'],
};

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectModel(Transaction) private txModel: typeof Transaction,
    @InjectModel(TransactionRefund) private refundModel: typeof TransactionRefund,
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(OrderEvent) private orderEventModel: typeof OrderEvent,
    @InjectModel(StockItem) private stockModel: typeof StockItem,
    private stripeService: StripeService,
    private sequelize: Sequelize,
  ) {}

  async findAll(query: any) {
    const { page = 1, perPage = 25, status, method } = query;
    const where: any = {};
    if (status) where.status = status;
    if (method) where.method = method;
    return this.txModel.findAndCountAll({
      where,
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });
  }

  async createPaymentIntent(data: { items: any[]; customerId: string; subtotal: number; discount: number; total: number; currency: string; couponId?: number | null; customerEmail?: string }) {
    const { items, customerId, subtotal, discount, total, currency, couponId, customerEmail } = data;
    if (total <= 0) throw new BadRequestException('El total debe ser mayor a cero');
    const amountCents = Math.round(total * 100);
    const pi = await this.stripeService.createPaymentIntent({ amount: amountCents, currency: currency || 'PEN', orderId: 'pending_' + customerId.slice(0, 8), customerEmail });

    // Reserve stock while payment is processing
    const stockIds = [...new Set(items.map((i: any) => i.productId).filter(Boolean))].sort();
    for (const pid of stockIds) {
      const qty = items.filter((i: any) => i.productId === pid).reduce((s: number, i: any) => s + i.quantity, 0);
      const [rows]: any[] = await this.sequelize.query(`SELECT * FROM stock_items WHERE product_id = :pid FOR UPDATE`, { replacements: { pid } });
      const si = rows?.[0];
      if (si) {
        const available = Number(si.quantity) - Number(si.reserved);
        if (qty > available) throw new BadRequestException(`Stock insuficiente`);
        await this.sequelize.query(`UPDATE stock_items SET reserved = reserved + :qty WHERE product_id = :pid`, { replacements: { pid, qty } });
      }
    }

    const tx = await this.txModel.create({
      transactionId: pi.id,
      orderId: null,
      stripeId: pi.id,
      method: 'visa',
      amount: total,
      currency: (currency || 'PEN').toUpperCase(),
      status: 'pending',
      metadata: { items, customerId, subtotal, discount, total, currency, couponId, clientSecret: pi.client_secret },
    } as any);

    return { clientSecret: pi.client_secret, transactionId: tx.id, stripePaymentIntentId: pi.id };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    if (!rawBody || !signature) {
      this.logger.warn('Webhook missing body or signature');
      return;
    }

    let event: any;
    try {
      event = this.stripeService.constructWebhookEvent(rawBody, signature);
    } catch (err: any) {
      this.logger.error('Invalid webhook signature: ' + err.message);
      return;
    }

    const eventId = event.id;
    const eventType = event.type;

    // Dedup: check if this event was already processed
    const existing = await this.sequelize.query(
      `SELECT status FROM webhook_events WHERE provider = 'stripe' AND external_event_id = :eid`,
      { replacements: { eid: eventId }, type: 'SELECT' },
    );
    if ((existing as any[]).length > 0) {
      this.logger.log(`Duplicate webhook event ${eventId} (${eventType}), skipping`);
      return;
    }

    // Insert event record atomically
    try {
      await this.sequelize.query(
        `INSERT INTO webhook_events (provider, external_event_id, event_type, status) VALUES ('stripe', :eid, :etype, 'processing')`,
        { replacements: { eid: eventId, etype: eventType } },
      );
    } catch (err: any) {
      if (err.name === 'SequelizeUniqueConstraintError' || err.code === '23505') {
        this.logger.log(`Duplicate webhook event ${eventId} (concurrent), skipping`);
        return;
      }
      throw err;
    }

    // Replay protection: reject events older than 5 minutes
    if (event.created && Date.now() / 1000 - event.created > 300) {
      this.logger.warn(`Stale webhook event ${eventId} rejected (age > 5min)`);
      await this.sequelize.query(`UPDATE webhook_events SET status = 'failed' WHERE provider = 'stripe' AND external_event_id = :eid`, {
        replacements: { eid: eventId },
      });
      return;
    }

    try {
      switch (eventType) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event);
          break;
        case 'charge.refunded':
          await this.handleChargeRefunded(event);
          break;
        default:
          this.logger.log(`Unhandled webhook event type: ${eventType}`);
      }

      await this.sequelize.query(
        `UPDATE webhook_events SET status = 'completed', order_id = (SELECT order_id FROM transactions WHERE stripe_id = :sid LIMIT 1), processed_at = NOW() WHERE provider = 'stripe' AND external_event_id = :eid`,
        { replacements: { eid: eventId, sid: event.data?.object?.id || '' } },
      );
    } catch (err: any) {
      this.logger.error(`Webhook processing failed for ${eventId}: ${err.message}`);
      await this.sequelize.query(`UPDATE webhook_events SET status = 'failed' WHERE provider = 'stripe' AND external_event_id = :eid`, {
        replacements: { eid: eventId },
      });
    }
  }

  private async handlePaymentSuccess(event: any) {
    const pi = event.data.object;
    const tx = await this.txModel.findOne({ where: { stripeId: pi.id } });
    if (!tx) { this.logger.warn(`No transaction found for ${pi.id}`); return; }

    const meta = tx.metadata as any;
    const items: any[] = meta?.items || [];
    if (items.length === 0) { this.logger.warn(`No items in metadata for ${pi.id}`); return; }

    await this.sequelize.transaction(async (t) => {
      const orderNumber = `ORD-${Date.now()}`;
      const order = await this.orderModel.create({
        orderNumber, customerId: meta.customerId || null, status: 'paid', paid: true, paidAt: new Date(),
        subtotal: meta.subtotal || 0, discount: meta.discount || 0, total: meta.total || 0,
        ...(meta.couponId ? { couponId: meta.couponId } : {}),
      } as any, { transaction: t });

      for (const item of items) {
        await this.orderItemModel.create({
          orderId: order.id, productId: item.productId, variantId: item.variantId || null,
          productName: item.name, sku: item.sku, variantLabel: item.variantLabel || '',
          unitPrice: item.unitPrice, quantity: item.quantity, total: item.unitPrice * item.quantity,
          currency: (meta.currency || 'PEN').toUpperCase(),
        } as any, { transaction: t });
      }

      await this.orderEventModel.create({ orderId: order.id, type: 'paid', title: 'Pago Confirmado',
        description: `Pago de S/ ${Number(meta.total || 0).toFixed(2)} confirmado vía Stripe`,
      } as any, { transaction: t });

      const stockIds = [...new Set(items.map((i: any) => i.productId).filter(Boolean))].sort();
      for (const pid of stockIds) {
        const qty = items.filter((i: any) => i.productId === pid).reduce((s: number, i: any) => s + i.quantity, 0);
        await this.sequelize.query(
          `UPDATE stock_items SET quantity = quantity - CAST(:qty AS INTEGER), reserved = GREATEST(reserved - CAST(:qty AS INTEGER), 0) WHERE product_id = :pid`,
          { replacements: { pid, qty }, transaction: t },
        );
      }

      if (meta.couponId) {
        await this.sequelize.query(
          `UPDATE coupons SET used_count = used_count + 1 WHERE id = :id AND (max_uses IS NULL OR used_count < max_uses)`,
          { replacements: { id: meta.couponId }, transaction: t },
        );
      }

      if (meta.customerId) {
        await this.sequelize.query(`DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE customer_id = :cid)`, { replacements: { cid: meta.customerId }, transaction: t });
      }

      await tx.update({ status: 'succeeded', orderId: order.id }, { transaction: t });
    });
  }

  private async handlePaymentFailure(event: any) {
    const pi = event.data.object;
    const tx = await this.txModel.findOne({ where: { stripeId: pi.id } });
    if (!tx) { this.logger.warn(`No transaction found for ${pi.id}`); return; }
    await tx.update({ status: 'failed' });
    // Release reserved stock
    const meta = tx.metadata as any;
    const items: any[] = meta?.items || [];
    const stockIds = [...new Set(items.map((i: any) => i.productId).filter(Boolean))].sort();
    for (const pid of stockIds) {
      const qty = items.filter((i: any) => i.productId === pid).reduce((s: number, i: any) => s + i.quantity, 0);
      await this.sequelize.query(`UPDATE stock_items SET reserved = GREATEST(reserved - :qty, 0) WHERE product_id = :pid`, { replacements: { pid, qty } });
    }
    this.logger.log(`Payment failed for ${pi.id} — stock released`);
  }

  private async handleChargeRefunded(event: any) {
    const charge = event.data.object;
    const piId = charge.payment_intent;
    const tx = await this.txModel.findOne({ where: { stripeId: piId } });
    if (!tx) {
      this.logger.warn(`No transaction found for PI ${piId}`);
      return;
    }

    await this.sequelize.transaction(async (t) => {
      if (!tx.orderId) return;
      const order = await this.orderModel.findByPk(tx.orderId, { transaction: t });
      if (!order) return;

      const allowed = ORDER_TRANSITIONS[order.status] || [];
      if (!allowed.includes('cancelled') && order.status !== 'paid') return;

      await tx.update({ status: 'refunded' }, { transaction: t });
      await order.update({ status: 'cancelled' }, { transaction: t });

      // Restore stock (add back on refund)
      const items = await this.orderItemModel.findAll({ where: { orderId: order.id }, transaction: t });
      const stockIds = [...new Set(items.map((i) => i.productId).filter(Boolean))].sort();
      for (const pid of stockIds) {
        const qty = items.filter((i) => i.productId === pid).reduce((s, i) => s + i.quantity, 0);
        await this.sequelize.query(
          `UPDATE stock_items SET reserved = GREATEST(reserved - CAST(:qty AS INTEGER), 0), quantity = quantity + CAST(:qty AS INTEGER) WHERE product_id = :pid`,
          { replacements: { pid, qty }, transaction: t },
        );
      }

      await this.orderEventModel.create(
        {
          orderId: order.id,
          type: 'cancelled',
          title: 'Reembolsado',
          description: `Cargo reembolsado. Stock restaurado.`,
        } as any,
        { transaction: t },
      );
    });
  }

  async releaseExpiredReservations() {
    // Release orders in 'pending' status older than 30 minutes
    const cutoff = new Date(Date.now() - 30 * 60 * 1000);
    const expiredOrders = await this.orderModel.findAll({
      where: { status: 'pending', placedAt: { [Op.lt]: cutoff } },
    });

    for (const order of expiredOrders) {
      await this.sequelize.transaction(async (t) => {
        const items = await this.orderItemModel.findAll({ where: { orderId: order.id }, transaction: t });
        const stockIds = [...new Set(items.map((i) => i.productId).filter(Boolean))].sort();
        for (const pid of stockIds) {
          const qty = items.filter((i) => i.productId === pid).reduce((s, i) => s + i.quantity, 0);
          await this.sequelize.query(
            `UPDATE stock_items SET reserved = GREATEST(reserved - CAST(:qty AS INTEGER), 0) WHERE product_id = :pid`,
            { replacements: { pid, qty }, transaction: t },
          );
        }
        await order.update({ status: 'cancelled' }, { transaction: t });
        await this.orderEventModel.create(
          {
            orderId: order.id,
            type: 'cancelled',
            title: 'Reserva Expirada',
            description: 'Liberación automática por tiempo de espera agotado',
          } as any,
          { transaction: t },
        );
      });
    }
    return { released: expiredOrders.length };
  }

  async refund(transactionId: string, amount: number, reason: string, userId: string) {
    const tx = await this.txModel.findByPk(transactionId);
    if (!tx) throw new NotFoundException('Transaction not found');
    if (tx.status !== 'succeeded') throw new BadRequestException('Only succeeded transactions can be refunded');
    if (amount > Number(tx.amount)) throw new BadRequestException('Refund amount exceeds transaction amount');

    if (tx.stripeId) {
      await this.stripeService.createRefund(tx.stripeId, amount, reason);
    }

    const refund = await this.refundModel.create({
      transactionId,
      amount,
      reason,
      createdBy: userId,
    } as any);

    await tx.update({ status: 'refunded' });

    return refund;
  }
}
