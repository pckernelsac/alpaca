import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'categories', timestamps: true, underscored: true, paranoid: true })
export class Category extends Model<Category> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  parentId: number;

  @HasMany(() => Product)
  products: Product[];
}
