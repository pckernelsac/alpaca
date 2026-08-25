import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'artisan_processes', timestamps: true, underscored: true })
export class ArtisanProcess extends Model<ArtisanProcess> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(255), allowNull: false }) title: string;
  @Column({ type: DataType.TEXT, allowNull: true }) description: string;
  @Column({ type: DataType.STRING(50), allowNull: true }) icon: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) image: string;
  @Column({ type: DataType.INTEGER, defaultValue: 0 }) stepOrder: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
