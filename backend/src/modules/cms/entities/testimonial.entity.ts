import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'testimonials', timestamps: true, underscored: true })
export class Testimonial extends Model<Testimonial> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(255), allowNull: false }) author: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) role: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) company: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) avatar: string;
  @Column({ type: DataType.TEXT, allowNull: false }) text: string;
  @Column({ type: DataType.INTEGER, allowNull: true }) rating: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: false }) featured: boolean;
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) order: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
