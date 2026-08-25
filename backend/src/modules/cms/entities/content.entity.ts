import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'contents', timestamps: true, underscored: true })
export class Content extends Model<Content> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true }) id: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) title: string;
  @Column({ type: DataType.STRING(255), allowNull: false, unique: true }) slug: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) type: string;
  @Column({ type: DataType.TEXT, allowNull: true }) body: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) image: string;
  @Column({ type: DataType.UUID, allowNull: true }) authorId: string;
  @Column({ type: DataType.STRING(30), defaultValue: 'draft' }) status: string;
  @Column({ type: DataType.DATE, allowNull: true }) publishedAt: Date;
}
