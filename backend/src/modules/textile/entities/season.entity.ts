import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'seasons', timestamps: true, underscored: true })
export class Season extends Model<Season> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  startMonth: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  endMonth: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}
