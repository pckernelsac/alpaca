import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { CustomerAddress } from './customer-address.entity';
import { WishlistItem } from './wishlist-item.entity';
import { Review } from './review.entity';

@Table({ tableName: 'customers', timestamps: true, underscored: true, paranoid: true })
export class Customer extends Model<Customer> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING(5), defaultValue: 'es' })
  language: string;

  @Column({ type: DataType.STRING(5), defaultValue: 'PEN' })
  currency: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  comms: boolean;

  @Column({ type: DataType.STRING(50), allowNull: true })
  loyaltyTier: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  loyaltyPoints: number;

  @Column({ type: DataType.DATE, allowNull: true })
  emailVerifiedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @HasMany(() => CustomerAddress)
  addresses: CustomerAddress[];

  @HasMany(() => WishlistItem)
  wishlistItems: WishlistItem[];

  @HasMany(() => Review)
  reviews: Review[];
}
