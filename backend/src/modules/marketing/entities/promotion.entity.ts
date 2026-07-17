import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'promotions', timestamps: true, underscored: true })
export class Promotion extends Model<Promotion> {
  @Column({ type: DataType.STRING(255), allowNull: false }) name: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) type: string;
  @Column({ type: DataType.DECIMAL(8, 2), allowNull: false }) discountValue: number;
  @Column({ type: DataType.STRING(30), allowNull: false }) appliesTo: string;
  @Column({ type: DataType.JSONB, allowNull: true }) productIds: any;
  @Column({ type: DataType.INTEGER, allowNull: true }) categoryId: number;
  @Column({ type: DataType.DATE, allowNull: false }) startsAt: Date;
  @Column({ type: DataType.DATE, allowNull: false }) endsAt: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
