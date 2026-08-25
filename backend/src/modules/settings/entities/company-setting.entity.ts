import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'company_settings', timestamps: true, underscored: true })
export class CompanySetting extends Model<CompanySetting> {
  @Column({ type: DataType.STRING(500), allowNull: true }) logo: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) legalName: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) taxId: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) industry: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) website: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) email: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) phone: string;
  @Column({ type: DataType.TEXT, allowNull: true }) address: string;
  @Column({ type: DataType.STRING(5), defaultValue: 'PEN' }) primaryCurrency: string;
  @Column({ type: DataType.STRING(50), defaultValue: 'America/Lima' }) defaultTimezone: string;
  @Column({ type: DataType.STRING(5), defaultValue: 'es' }) systemLanguage: string;
}
@Table({ tableName: 'contact_inquiries', timestamps: true, underscored: true })
export class ContactInquiry extends Model<ContactInquiry> {
  @Column({ type: DataType.STRING(255), allowNull: false }) name: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) email: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) subject: string;
  @Column({ type: DataType.TEXT, allowNull: false }) message: string;
  @Column({ type: DataType.STRING(30), defaultValue: 'pending' }) status: string;
}
