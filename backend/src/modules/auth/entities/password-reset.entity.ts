import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'password_resets', timestamps: true, underscored: true })
export class PasswordReset extends Model<PasswordReset> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(255), allowNull: false }) email: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) token: string;
  @Column({ type: DataType.STRING(20), allowNull: false }) actorType: string;
  @Column({ type: DataType.DATE, allowNull: false }) expiresAt: Date;
}
