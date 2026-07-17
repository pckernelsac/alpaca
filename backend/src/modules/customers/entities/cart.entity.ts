import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Customer } from './customer.entity';
import { CartItem } from './cart-item.entity';

@Table({ tableName: 'carts', timestamps: true, underscored: true })
export class Cart extends Model<Cart> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.UUID, allowNull: true })
  customerId: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  sessionId: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  couponId: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  subtotal: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  shippingFee: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  tax: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  discount: number;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  total: number;

  @Column({ type: DataType.DATE, allowNull: true })
  expiresAt: Date;

  @BelongsTo(() => Customer)
  customer: Customer;

  @HasMany(() => CartItem)
  items: CartItem[];
}
