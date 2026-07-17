import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { OrderEvent } from './order-event.entity';
import { OrderDocument } from './order-document.entity';

@Table({ tableName: 'orders', timestamps: true, underscored: true })
export class Order extends Model<Order> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
  orderNumber: string;

  @Column({ type: DataType.UUID, allowNull: true })
  customerId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  clientId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  userId: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  channel: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  agent: string;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  subtotal: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  tax: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  shippingFee: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  discount: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  total: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  paid: boolean;

  @Column({ type: DataType.DATE, allowNull: true })
  paidAt: Date;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes: string;

  @Column({ type: DataType.DATE, allowNull: true })
  placedAt: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  couponId: number;

  @HasMany(() => OrderItem)
  items: OrderItem[];

  @HasMany(() => OrderEvent)
  events: OrderEvent[];

  @HasMany(() => OrderDocument)
  documents: OrderDocument[];
}
