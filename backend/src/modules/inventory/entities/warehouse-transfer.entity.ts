import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { WarehouseTransferItem } from './warehouse-transfer-item.entity';

@Table({ tableName: 'warehouse_transfers', timestamps: true, underscored: true })
export class WarehouseTransfer extends Model<WarehouseTransfer> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(30), allowNull: false, unique: true })
  transferNumber: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  originWarehouseId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  destinationWarehouseId: number;

  @Column({ type: DataType.STRING(30), defaultValue: 'requested' })
  status: string;

  @Column({ type: DataType.UUID, allowNull: true })
  responsibleId: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  notes: string;

  @HasMany(() => WarehouseTransferItem)
  items: WarehouseTransferItem[];
}
