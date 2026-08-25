import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Warehouse } from './warehouse.entity';

@Table({ tableName: 'stock_movements', timestamps: true, underscored: true })
export class StockMovement extends Model<StockMovement> {
  @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
  movementNumber: string;

  @Column({ type: DataType.UUID, allowNull: true })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @ForeignKey(() => Warehouse)
  @Column({ type: DataType.INTEGER, allowNull: true })
  warehouseId: number;

  @Column({ type: DataType.STRING(30), allowNull: false })
  type: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  quantity: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  balance: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  reference: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  reason: string;

  @Column({ type: DataType.UUID, allowNull: true })
  personId: string;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
}
