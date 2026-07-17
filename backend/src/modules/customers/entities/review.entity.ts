import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ tableName: 'reviews', timestamps: true, underscored: true })
export class Review extends Model<Review> {
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.UUID, allowNull: true })
  customerId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  author: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  text: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  tag: string;

  @BelongsTo(() => Customer)
  customer: Customer;
}
