import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'campaigns', timestamps: true, underscored: true })
export class Campaign extends Model<Campaign> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true }) id: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) name: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) type: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) channel: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true }) budget: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true }) spent: number;
  @Column({ type: DataType.STRING(20), allowNull: true }) roi: string;
  @Column({ type: DataType.INTEGER, allowNull: true }) conversions: number;
  @Column({ type: DataType.STRING(30), defaultValue: 'draft' }) status: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) image: string;
  @Column({ type: DataType.DATE, allowNull: true }) startDate: Date;
  @Column({ type: DataType.DATE, allowNull: true }) endDate: Date;
  @Column({ type: DataType.UUID, allowNull: false }) createdBy: string;
}
