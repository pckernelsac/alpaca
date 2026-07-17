import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderEvent } from './entities/order-event.entity';
import { OrderDocument } from './entities/order-document.entity';

const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['paid', 'cancelled'],
  paid: ['preparing', 'cancelled'],
  preparing: ['shipped'],
  shipped: ['in_transit'],
  in_transit: ['delivered'],
  delivered: ['returned'],
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private o: typeof Order,
    @InjectModel(OrderEvent) private e: typeof OrderEvent,
  ) {}

  async findAll(q: any) {
    const { page = 1, perPage = 25, search, status, clientId, customerId } = q;
    const where: any = {};
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (customerId) where.customerId = customerId;
    if (search) where.orderNumber = { [Op.iLike]: `%${search}%` };
    return this.o.findAndCountAll({
      where,
      include: [OrderItem],
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });
  }

  async findById(id: string) {
    const r = await this.o.findByPk(id, { include: [OrderItem, OrderEvent, OrderDocument] });
    if (!r) throw new NotFoundException();
    return r;
  }

  async create(data: any, userId?: string) {
    const order = await this.o.create({ ...data, userId, orderNumber: `ORD-${Date.now()}`, status: 'pending' } as any);
    await this.e.create({ orderId: order.id, type: 'created', title: 'Pedido Creado', actorId: userId } as any);
    return order;
  }

  async updateStatus(id: string, status: string, actorId?: string) {
    const order = await this.o.findByPk(id);
    if (!order) throw new NotFoundException();
    const allowed = ORDER_STATUS_TRANSITIONS[order.status] || [];
    if (!allowed.includes(status)) throw new BadRequestException(`No se puede cambiar de ${order.status} a ${status}`);
    await order.update({ status, ...(status === 'paid' ? { paid: true, paidAt: new Date() } : {}) });
    await this.e.create({ orderId: id, type: status, actorId } as any);
    return order;
  }

  async addNote(id: string, notes: string) {
    const order = await this.o.findByPk(id);
    if (!order) throw new NotFoundException();
    return order.update({ notes });
  }

  async getEvents(id: string) {
    return this.e.findAll({ where: { orderId: id }, order: [['createdAt', 'ASC']] });
  }
}
