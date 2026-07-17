import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Transaction } from './transaction.entity';

@Table({ tableName: 'transaction_refunds', timestamps: true, underscored: true })
export class TransactionRefund extends Model<TransactionRefund> {
  @ForeignKey(() => Transaction)
  @Column({ type: DataType.UUID, allowNull: false })
  transactionId: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.STRING(500), allowNull: true })
  reason: string;

  @Column({ type: DataType.UUID, allowNull: false })
  createdBy: string;

  @BelongsTo(() => Transaction)
  transaction: Transaction;
}
