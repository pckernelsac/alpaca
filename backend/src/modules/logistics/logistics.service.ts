import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shipment } from './entities/shipment.entity';
import { Carrier } from './entities/carrier.entity';

@Injectable()
export class LogisticsService {
  constructor(
    @InjectModel(Shipment) private s: typeof Shipment,
    @InjectModel(Carrier) private c: typeof Carrier,
  ) {}
  async findAllShipments(q: any) {
    const { page = 1, perPage = 25 } = q;
    return this.s.findAndCountAll({ limit: Math.min(perPage, 200), offset: (page - 1) * perPage, order: [['createdAt', 'DESC']] });
  }
  async createShipment(data: any) {
    return this.s.create(data as any);
  }
  async updateStatus(id: string, status: string) {
    const r = await this.s.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update({ status });
  }
  async findAllCarriers() {
    return this.c.findAll({ where: { active: true } });
  }
}
