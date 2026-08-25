import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from './client.entity';

@Table({ tableName: 'client_addresses', timestamps: true, underscored: true })
export class ClientAddress extends Model<ClientAddress> {
  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, allowNull: false })
  clientId: string;

  @Column({ type: DataType.STRING(20), defaultValue: 'principal' })
  type: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  street: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  city: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  state: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  country: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  postalCode: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault: boolean;

  @BelongsTo(() => Client)
  client: Client;
}
