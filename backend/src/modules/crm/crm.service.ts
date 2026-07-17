import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Client } from './entities/client.entity';
import { ClientAddress } from './entities/client-address.entity';
import { ClientNote } from './entities/client-note.entity';

@Injectable()
export class CrmService {
  constructor(
    @InjectModel(Client) private c: typeof Client,
    @InjectModel(ClientNote) private n: typeof ClientNote,
  ) {}

  async findAll(q: any) {
    const { page = 1, perPage = 25, search, status, type } = q;
    const where: any = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (status) where.status = status;
    if (type) where.type = type;
    return this.c.findAndCountAll({
      where,
      include: [ClientAddress],
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });
  }
  async findById(id: string) {
    const r = await this.c.findByPk(id, { include: [ClientAddress, ClientNote] });
    if (!r) throw new NotFoundException();
    return r;
  }
  async create(data: any) {
    return this.c.create(data as any);
  }
  async update(id: string, data: any) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async addNote(clientId: string, data: any) {
    return this.n.create({ ...data, clientId } as any);
  }
}
