import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'hero_slides', timestamps: true, underscored: true })
export class HeroSlide extends Model<HeroSlide> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(255), allowNull: false }) title: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) subtitle: string;
  @Column({ type: DataType.STRING(100), allowNull: true }) ctaText: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) ctaLink: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) image: string;
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) order: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
