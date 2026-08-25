import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';

@Table({ tableName: 'product_media', timestamps: true, underscored: true })
export class ProductMedia extends Model<ProductMedia> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.UUID, allowNull: true })
  variantId: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  url: string;

  @Column({ type: DataType.STRING(10), defaultValue: 'image' })
  type: string;

  @Column({ type: DataType.STRING(10), allowNull: true })
  format: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  fileSize: string;

  @Column({ type: DataType.STRING(30), allowNull: true })
  dimensions: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  altText: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPrincipal: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  visible: boolean;

  @BelongsTo(() => Product)
  product: Product;
}
