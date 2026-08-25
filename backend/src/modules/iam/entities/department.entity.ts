import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ tableName: 'departments', timestamps: true, underscored: true })
export class Department extends Model<Department> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true }) id: number;
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true }) name: string;
}
