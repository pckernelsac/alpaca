import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ tableName: 'wishlist_items', timestamps: true, underscored: true })
export class WishlistItem extends Model<WishlistItem> {
  @ForeignKey(() => Customer)
  @Column({ type: DataType.UUID, allowNull: false })
  customerId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @BelongsTo(() => Customer)
  customer: Customer;
}
