import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class IamService {
  constructor(
    @InjectModel(User) private u: typeof User,
    @InjectModel(Role) private r: typeof Role,
    @InjectModel(Permission) private p: typeof Permission,
    @InjectModel(RolePermission) private rp: typeof RolePermission,
  ) {}

  async findAllUsers(q: any) {
    const { page = 1, perPage = 25, search, role, status } = q;
    const where: any = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (role) where.roleId = role;
    if (status) where.status = status;
    return this.u.findAndCountAll({
      where,
      include: [Role],
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    });
  }

  async findUserById(id: string) {
    const r = await this.u.findByPk(id, { include: [Role], attributes: { exclude: ['password'] } });
    if (!r) throw new NotFoundException();
    return r;
  }

  async createUser(data: any) {
    const existing = await this.u.findOne({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email ya registrado');
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return this.u.create(data as any);
  }

  async updateUser(id: string, data: any) {
    const r = await this.u.findByPk(id);
    if (!r) throw new NotFoundException();
    if (data.password) data.password = await bcrypt.hash(data.password, 10);
    return r.update(data);
  }

  async deleteUser(id: string) {
    const r = await this.u.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }
  async updateStatus(id: string, status: string) {
    const r = await this.u.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update({ status });
  }

  async findAllRoles() {
    return this.r.findAll({ include: [Permission] });
  }
  async createRole(data: any) {
    return this.r.create(data as any);
  }
  async updateRole(id: number, data: any) {
    const r = await this.r.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteRole(id: number) {
    const r = await this.r.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async findAllPermissions() {
    return this.p.findAll();
  }

  async saveMatrix(matrix: { roleId: number; permissionIds: number[] }[]) {
    for (const entry of matrix) {
      await this.rp.destroy({ where: { roleId: entry.roleId } });
      for (const permId of entry.permissionIds) {
        await this.rp.create({ roleId: entry.roleId, permissionId: permId } as any);
      }
    }
    return { success: true };
  }
}
