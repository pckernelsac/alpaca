import { Table, Column, Model, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'tags', timestamps: true, underscored: true })
export class Tag extends Model<Tag> {
  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  name: string;

  @BelongsToMany(() => Product, () => ProductTag)
  products: Product[];
}

@Table({ tableName: 'product_tags', timestamps: true, underscored: true })
export class ProductTag extends Model<ProductTag> {
  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER, allowNull: false })
  tagId: number;
}
