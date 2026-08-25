import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Warehouse } from './warehouse.entity';

@Table({ tableName: 'stock_items', timestamps: true, underscored: true })
export class StockItem extends Model<StockItem> {
  @Column({ type: DataType.UUID, allowNull: true })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @ForeignKey(() => Warehouse)
  @Column({ type: DataType.INTEGER, allowNull: false })
  warehouseId: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  quantity: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  reserved: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  minStock: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  maxStock: number;

  @Column({ type: DataType.DATE, allowNull: true })
  lastMovementAt: Date;

  @BelongsTo(() => Warehouse)
  warehouse: Warehouse;
}
