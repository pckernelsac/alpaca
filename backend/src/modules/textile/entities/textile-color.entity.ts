import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'textile_colors', timestamps: true, underscored: true })
export class TextileColor extends Model<TextileColor> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(7), allowNull: false })
  hex: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  pantone: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}
