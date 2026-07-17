import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog) private m: typeof AuditLog) {}
  async findAll(q: any) {
    const { page = 1, perPage = 25, severity, module: mod } = q;
    const where: any = {};
    if (severity) where.severity = severity;
    if (mod) where.module = mod;
    return this.m.findAndCountAll({ where, limit: Math.min(perPage, 200), offset: (page - 1) * perPage, order: [['createdAt', 'DESC']] });
  }
}
