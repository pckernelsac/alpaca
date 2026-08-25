import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Client } from './client.entity';

@Table({ tableName: 'client_notes', timestamps: true, underscored: true })
export class ClientNote extends Model<ClientNote> {
  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, allowNull: false })
  clientId: string;

  @Column({ type: DataType.UUID, allowNull: true })
  userId: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @BelongsTo(() => Client)
  client: Client;
}
