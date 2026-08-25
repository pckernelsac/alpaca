import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.entity';

@Table({ tableName: 'product_variants', timestamps: true, underscored: true })
export class ProductVariant extends Model<ProductVariant> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  sku: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  code: string;

  @Column({ type: DataType.STRING(7), allowNull: true })
  colorHex: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  colorName: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  sizeId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  materialId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  colorId: number;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  stock: number;

  @Column({ type: DataType.STRING(30), defaultValue: 'active' })
  status: string;

  @BelongsTo(() => Product)
  product: Product;
}
