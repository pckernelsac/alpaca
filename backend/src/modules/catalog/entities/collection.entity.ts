import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'collections', timestamps: true, underscored: true, paranoid: true })
export class Collection extends Model<Collection> {
  @Column({ type: DataType.STRING(20), primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  pieceCount: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  seasonId: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;

  @HasMany(() => Product)
  products: Product[];
}
