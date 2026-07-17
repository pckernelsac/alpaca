import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cart } from './cart.entity';

@Table({ tableName: 'cart_items', timestamps: true, underscored: true })
export class CartItem extends Model<CartItem> {
  @ForeignKey(() => Cart)
  @Column({ type: DataType.UUID, allowNull: false })
  cartId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

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

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  total: number;

  @BelongsTo(() => Cart)
  cart: Cart;
}
