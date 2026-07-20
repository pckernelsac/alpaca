import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Collection } from './collection.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductMedia } from './product-media.entity';

@Table({ tableName: 'products', timestamps: true, underscored: true, paranoid: true })
export class Product extends Model<Product> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  sku: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  material: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: true })
  categoryId: number;

  @ForeignKey(() => Collection)
  @Column({ type: DataType.STRING(20), allowNull: true })
  collectionId: string;

  @Column({ type: DataType.DECIMAL(8, 2), allowNull: true })
  weight: number;

  @Column({ type: DataType.STRING(30), defaultValue: 'draft' })
  status: string;

  @Column({ type: DataType.UUID, allowNull: true })
  createdBy: string;

  @Column({ type: DataType.DATE, allowNull: true })
  publishedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Collection)
  collection: Collection;

  @HasMany(() => ProductVariant)
  variants: ProductVariant[];

  @HasMany(() => ProductMedia)
  media: ProductMedia[];
}
