import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { TransactionRefund } from './transaction-refund.entity';

@Table({ tableName: 'transactions', timestamps: true, underscored: true })
export class Transaction extends Model<Transaction> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  transactionId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  orderId: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  stripeId: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  method: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.STRING(5), defaultValue: 'USD' })
  currency: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'pending' })
  status: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  metadata: any;

  @HasMany(() => TransactionRefund)
  refunds: TransactionRefund[];
}
