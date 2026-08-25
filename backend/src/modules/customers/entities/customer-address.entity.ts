import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ tableName: 'customer_addresses', timestamps: true, underscored: true })
export class CustomerAddress extends Model<CustomerAddress> {
  @ForeignKey(() => Customer)
  @Column({ type: DataType.UUID, allowNull: false })
  customerId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  street: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  city: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  state: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  zip: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  country: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  phone: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault: boolean;

  @BelongsTo(() => Customer)
  customer: Customer;
}
