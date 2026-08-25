import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ClientAddress } from './client-address.entity';
import { ClientPaymentMethod } from './client-payment-method.entity';
import { ClientNote } from './client-note.entity';

@Table({ tableName: 'clients', timestamps: true, underscored: true, paranoid: true })
export class Client extends Model<Client> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  company: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  website: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  documentType: string;

  @Column({ type: DataType.STRING(30), allowNull: true, unique: true })
  documentNumber: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'wholesale' })
  type: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'active' })
  status: string;

  @Column({ type: DataType.UUID, allowNull: true })
  assignedSellerId: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true })
  creditLimit: number;

  @Column({ type: DataType.STRING(100), allowNull: true })
  paymentTerms: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  internalNotes: string;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @HasMany(() => ClientAddress)
  addresses: ClientAddress[];

  @HasMany(() => ClientPaymentMethod)
  paymentMethods: ClientPaymentMethod[];

  @HasMany(() => ClientNote)
  notes: ClientNote[];
}
