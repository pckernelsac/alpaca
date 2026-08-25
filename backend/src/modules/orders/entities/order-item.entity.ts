import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table({ tableName: 'order_items', timestamps: true, underscored: true })
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  productName: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  sku: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  variantLabel: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  imageUrl: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  unitPrice: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  discountAmount: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  taxAmount: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  total: number;

  @Column({ type: DataType.STRING(5), defaultValue: 'USD' })
  currency: string;

  @BelongsTo(() => Order)
  order: Order;
}
