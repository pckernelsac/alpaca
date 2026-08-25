import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
@Table({ tableName: 'faq_categories', timestamps: true, underscored: true })
export class FaqCategory extends Model<FaqCategory> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(255), allowNull: false }) name: string;
  @Column({ type: DataType.STRING(100), unique: true, allowNull: false }) slug: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) icon: string;
  @Column({ type: DataType.INTEGER, allowNull: false }) order: number;
  @HasMany(() => FaqItem) items: FaqItem[];
}
@Table({ tableName: 'faq_items', timestamps: true, underscored: true })
export class FaqItem extends Model<FaqItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @ForeignKey(() => FaqCategory) @Column({ type: DataType.INTEGER, allowNull: false }) categoryId: number;
  @Column({ type: DataType.TEXT, allowNull: false }) question: string;
  @Column({ type: DataType.TEXT, allowNull: false }) answer: string;
  @Column({ type: DataType.INTEGER, allowNull: false }) order: number;
}
