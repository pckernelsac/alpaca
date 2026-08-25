import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Table({ tableName: 'role_permissions', timestamps: true, underscored: true })
export class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  permissionId: number;
}
