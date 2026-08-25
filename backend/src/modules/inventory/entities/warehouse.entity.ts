import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'warehouses', timestamps: true, underscored: true })
export class Warehouse extends Model<Warehouse> {
  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(20), allowNull: true, unique: true })
  code: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  city: string;

  @Column({ type: DataType.STRING(30), defaultValue: 'principal' })
  type: string;
}
