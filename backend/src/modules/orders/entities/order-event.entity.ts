import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table({ tableName: 'order_events', timestamps: true, underscored: true })
export class OrderEvent extends Model<OrderEvent> {
  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  type: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.UUID, allowNull: true })
  actorId: string;

  @BelongsTo(() => Order)
  order: Order;
}
