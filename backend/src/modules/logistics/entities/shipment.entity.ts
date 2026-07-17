import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ShipmentEvent } from './shipment-event.entity';

@Table({ tableName: 'shipments', timestamps: true, underscored: true })
export class Shipment extends Model<Shipment> {
  @Column({ type: DataType.STRING(50), allowNull: false, unique: true }) waybill: string;
  @Column({ type: DataType.UUID, allowNull: false }) orderId: string;
  @Column({ type: DataType.STRING(100), allowNull: false }) carrier: string;
  @Column({ type: DataType.STRING(30), defaultValue: 'pending' }) status: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) originCity: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) destinationCity: string;
  @Column({ type: DataType.DATE, allowNull: true }) dispatchedAt: Date;
  @Column({ type: DataType.DATE, allowNull: true }) estimatedAt: Date;
  @Column({ type: DataType.DATE, allowNull: true }) deliveredAt: Date;
  @Column({ type: DataType.JSONB, allowNull: true }) trackingData: any;
  @HasMany(() => ShipmentEvent) events: ShipmentEvent[];
}
