import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'newsletter_subscribers', timestamps: true, underscored: true })
export class NewsletterSubscriber extends Model<NewsletterSubscriber> {
  @Column({ type: DataType.STRING(255), unique: true, allowNull: false }) email: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) source: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
