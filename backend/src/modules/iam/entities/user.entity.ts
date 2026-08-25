import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './role.entity';

@Table({ tableName: 'users', timestamps: true, underscored: true, paranoid: true })
export class User extends Model<User> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING(50), allowNull: true, unique: true })
  employeeId: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  position: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @Column({ type: DataType.STRING(500), allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'active' })
  status: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  forcePasswordChange: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  lastAccessAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @BelongsTo(() => Role)
  role: Role;
}
