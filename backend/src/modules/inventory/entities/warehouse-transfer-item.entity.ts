import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { WarehouseTransfer } from './warehouse-transfer.entity';

@Table({ tableName: 'warehouse_transfer_items', timestamps: true, underscored: true })
export class WarehouseTransferItem extends Model<WarehouseTransferItem> {
  @ForeignKey(() => WarehouseTransfer)
  @Column({ type: DataType.UUID, allowNull: false })
  transferId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  productId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  lotNumber: string;

  @BelongsTo(() => WarehouseTransfer)
  transfer: WarehouseTransfer;
}
