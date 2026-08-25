import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'order_idempotency_keys', timestamps: true, underscored: true })
export class IdempotencyKey extends Model<IdempotencyKey> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.UUID, allowNull: false }) customerId: string;
  @Column({ type: DataType.STRING(50), allowNull: false }) scope: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) idempotencyKey: string;
  @Column({ type: DataType.STRING(64), allowNull: false }) requestHash: string;
  @Column({ type: DataType.STRING(20), allowNull: false, defaultValue: 'processing' }) status: string;
  @Column({ type: DataType.UUID, allowNull: true }) resourceId: string;
  @Column({ type: DataType.INTEGER, allowNull: true }) responseStatus: number;
  @Column({ type: DataType.JSONB, allowNull: true }) responseBody: any;
  @Column({ type: DataType.DATE, allowNull: true }) expiresAt: Date;
}
