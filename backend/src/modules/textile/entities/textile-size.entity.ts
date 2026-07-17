import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'textile_sizes', timestamps: true, underscored: true })
export class TextileSize extends Model<TextileSize> {
  @Column({ type: DataType.STRING(20), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  category: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  order: number;
}
