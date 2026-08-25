import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'sessions', timestamps: true, underscored: true })
export class Session extends Model<Session> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true }) id: string;
  @Column({ type: DataType.UUID, allowNull: true }) userId: string;
  @Column({ type: DataType.UUID, allowNull: true }) customerId: string;
  @Column({ type: DataType.STRING(20), allowNull: false }) actorType: string;
  @Column({ type: DataType.STRING(500), allowNull: false, unique: true }) refreshToken: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) deviceName: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) platform: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) browser: string;
  @Column({ type: DataType.STRING(45), allowNull: true }) ipAddress: string;
  @Column({ type: DataType.DATE, allowNull: true }) lastActivityAt: Date;
  @Column({ type: DataType.DATE, allowNull: false }) expiresAt: Date;
}
