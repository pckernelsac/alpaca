import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.entity';
import { RolePermission } from './role-permission.entity';

@Table({ tableName: 'permissions', timestamps: true, underscored: true })
export class Permission extends Model<Permission> {
  @Column({ type: DataType.STRING(100), allowNull: false })
  module: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  action: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  description: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}
