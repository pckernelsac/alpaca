import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.entity';
import { Permission } from './permission.entity';
import { RolePermission } from './role-permission.entity';

@Table({ tableName: 'roles', timestamps: true, underscored: true })
export class Role extends Model<Role> {
  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  category: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'active' })
  status: string;

  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];
}
