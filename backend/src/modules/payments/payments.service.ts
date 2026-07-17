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

  async createPaymentIntent(orderId: string, amount: number, currency: string, customerEmail?: string) {
    const pi = await this.stripeService.createPaymentIntent({ amount, currency, orderId, customerEmail });

    const tx = await this.txModel.create({
      transactionId: pi.id,
      orderId,
      stripeId: pi.id,
      method: 'stripe',
      amount,
      currency: currency.toUpperCase(),
      status: 'pending',
      metadata: { clientSecret: pi.client_secret },
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
    if (!tx) {
      this.logger.warn(`No transaction found for ${pi.id}`);
      return;
    }

    await this.sequelize.transaction(async (t) => {
      const order = await this.orderModel.findByPk(tx.orderId, { transaction: t });
      if (!order) return;

      // Validate state transition
      const allowed = ORDER_TRANSITIONS[order.status] || [];
      if (!allowed.includes('paid')) {
        this.logger.warn(`Cannot transition order ${order.id} from ${order.status} to paid`);
        return;
      }

      // Update transaction
      await tx.update({ status: 'succeeded' }, { transaction: t });

      // Update order
      await order.update({ status: 'paid', paid: true, paidAt: new Date() }, { transaction: t });

      // Commit stock: quantity = quantity - reserved, reserved = 0
      const items = await this.orderItemModel.findAll({ where: { orderId: order.id }, transaction: t });
      const stockIds = [...new Set(items.map((i) => i.productId).filter(Boolean))].sort();
      for (const pid of stockIds) {
        await this.sequelize.query(
          `UPDATE stock_items SET quantity = quantity - CAST(:qty AS INTEGER), reserved = GREATEST(reserved - CAST(:qty AS INTEGER), 0) WHERE product_id = :pid`,
          { replacements: { pid, qty: items.filter((i) => i.productId === pid).reduce((s, i) => s + i.quantity, 0) }, transaction: t },
        );
      }

      // Order event
      await this.orderEventModel.create(
        {
          orderId: order.id,
          type: 'paid',
          title: 'Pago Confirmado',
          description: `Pago de $${Number(tx.amount).toFixed(2)} confirmado vía Stripe`,
        } as any,
        { transaction: t },
      );
    });
  }

  private async handlePaymentFailure(event: any) {
    const pi = event.data.object;
    const tx = await this.txModel.findOne({ where: { stripeId: pi.id } });
    if (!tx) {
      this.logger.warn(`No transaction found for ${pi.id}`);
      return;
    }

    await this.sequelize.transaction(async (t) => {
      const order = await this.orderModel.findByPk(tx.orderId, { transaction: t });
      if (!order) return;

      const allowed = ORDER_TRANSITIONS[order.status] || [];
      if (!allowed.includes('cancelled')) {
        this.logger.warn(`Cannot cancel order ${order.id} from ${order.status}`);
        return;
      }

      // Update transaction
      await tx.update({ status: 'failed' }, { transaction: t });

      // Cancel order
      await order.update({ status: 'cancelled' }, { transaction: t });

      // Release reserved stock
      const items = await this.orderItemModel.findAll({ where: { orderId: order.id }, transaction: t });
      const stockIds = [...new Set(items.map((i) => i.productId).filter(Boolean))].sort();
      for (const pid of stockIds) {
        await this.sequelize.query(
          `UPDATE stock_items SET reserved = GREATEST(reserved - CAST(:qty AS INTEGER), 0) WHERE product_id = :pid`,
          { replacements: { pid, qty: items.filter((i) => i.productId === pid).reduce((s, i) => s + i.quantity, 0) }, transaction: t },
        );
      }

      // Order event
      await this.orderEventModel.create(
        {
          orderId: order.id,
          type: 'cancelled',
          title: 'Pago Fallido',
          description: `El pago fue rechazado. Stock liberado.`,
        } as any,
        { transaction: t },
      );
    });
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
