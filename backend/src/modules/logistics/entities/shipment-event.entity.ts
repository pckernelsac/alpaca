import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Shipment } from './shipment.entity';

@Table({ tableName: 'shipment_events', timestamps: true, underscored: true })
export class ShipmentEvent extends Model<ShipmentEvent> {
  @ForeignKey(() => Shipment) @Column({ type: DataType.UUID, allowNull: false }) shipmentId: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) status: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) location: string;
  @Column({ type: DataType.TEXT, allowNull: true }) description: string;
  @Column({ type: DataType.DATE, allowNull: false }) timestamp: Date;
  @BelongsTo(() => Shipment) shipment: Shipment;
}
