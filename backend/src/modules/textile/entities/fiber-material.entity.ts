import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'fiber_materials', timestamps: true, underscored: true })
export class FiberMaterial extends Model<FiberMaterial> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  category: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  micronRating: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  origin: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  certification: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}
