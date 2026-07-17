import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'coupons', timestamps: true, underscored: true })
export class Coupon extends Model<Coupon> {
  @Column({ type: DataType.STRING(50), unique: true, allowNull: false }) code: string;
  @Column({ type: DataType.STRING(20), allowNull: false }) type: string;
  @Column({ type: DataType.DECIMAL(8, 2), allowNull: false }) value: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true }) minPurchase: number;
  @Column({ type: DataType.INTEGER, allowNull: true }) maxUses: number;
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) usedCount: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
  @Column({ type: DataType.DATE, allowNull: true }) expiresAt: Date;
}
