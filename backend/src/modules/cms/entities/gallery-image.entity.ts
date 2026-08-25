import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'gallery_images', timestamps: true, underscored: true })
export class GalleryImage extends Model<GalleryImage> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(500), allowNull: false }) url: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) altText: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) caption: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) category: string;
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) order: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) visible: boolean;
}
