import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'carriers', timestamps: true, underscored: true })
export class Carrier extends Model<Carrier> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true }) name: string;
  @Column({ type: DataType.STRING(20), allowNull: false, unique: true }) code: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) active: boolean;
}
