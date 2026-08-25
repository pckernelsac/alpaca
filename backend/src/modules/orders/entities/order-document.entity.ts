import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table({ tableName: 'order_documents', timestamps: true, underscored: true })
export class OrderDocument extends Model<OrderDocument> {
  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  type: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  url: string;

  @BelongsTo(() => Order)
  order: Order;
}
