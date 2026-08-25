import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'audit_logs', timestamps: true, underscored: true, updatedAt: false })
export class AuditLog extends Model<AuditLog> {
  @Column({ type: DataType.UUID, allowNull: true }) userId: string;
  @Column({ type: DataType.STRING(100), allowNull: false }) action: string;
  @Column({ type: DataType.STRING(50), allowNull: false }) module: string;
  @Column({ type: DataType.TEXT, allowNull: true }) description: string;
  @Column({ type: DataType.STRING(45), allowNull: true }) ipAddress: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) device: string;
  @Column({ type: DataType.STRING(20), defaultValue: 'info' }) severity: string;
  @Column({ type: DataType.JSONB, allowNull: true }) metadata: any;
}
