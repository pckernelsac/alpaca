import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from './client.entity';

@Table({ tableName: 'client_payment_methods', timestamps: true, underscored: true })
export class ClientPaymentMethod extends Model<ClientPaymentMethod> {
  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, allowNull: false })
  clientId: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  brand: string;

  @Column({ type: DataType.STRING(4), allowNull: false })
  last4: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  expMonth: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  expYear: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDefault: boolean;

  @BelongsTo(() => Client)
  client: Client;
}
