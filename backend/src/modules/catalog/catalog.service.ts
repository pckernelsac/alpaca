import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Category } from './entities/category.entity';
import { Collection } from './entities/collection.entity';
import { ProductMedia } from './entities/product-media.entity';
import { RedisService } from '../../shared/redis/redis.service';

const CACHE_TTL = 300; // 5 minutes
const cacheKey = (key: string) => `alpacart:dev:catalog:${key}`;

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Product) private p: typeof Product,
    @InjectModel(ProductVariant) private v: typeof ProductVariant,
    @InjectModel(Category) private cat: typeof Category,
    @InjectModel(Collection) private col: typeof Collection,
    @InjectModel(ProductMedia) private m: typeof ProductMedia,
    private redis: RedisService,
  ) {}

  async findAllProducts(q: any) {
    const { page: rawPage = 1, perPage = 25, search, categoryId, collectionId, status, sort: rawSort, order: rawOrder = 'DESC' } = q;
    const where: any = {};
    if (search) where.name = { [Op.iLike]: `%${search}%` };
    if (categoryId) where.categoryId = categoryId;
    if (collectionId) where.collectionId = collectionId;
    if (status) where.status = status;
    const allowedSort = ['createdAt', 'name', 'updatedAt', 'weight'];
    const page = Math.max(1, Number(rawPage) || 1);
    const sort = allowedSort.includes(rawSort) ? rawSort : 'createdAt';
    const order = rawOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    // Build deterministic cache key from query params
    const key = cacheKey(`products:${JSON.stringify({ search, categoryId, collectionId, status, page, perPage, sort, order })}`);
    // Cache-aside: try Redis first
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);
    // Cache miss: query PostgreSQL
    const result = await this.p.findAndCountAll({
      where,
      include: [Category, Collection],
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [[sort, order]],
    });
    // Store in Redis
    await this.redis.set(key, JSON.stringify(result), CACHE_TTL);
    return result;
  }

  async findProductById(id: string) {
    const key = cacheKey(`product:${id}`);
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);
    const r = await this.p.findByPk(id, { include: [Category, Collection, ProductVariant, ProductMedia] });
    if (!r) throw new NotFoundException();
    await this.redis.set(key, JSON.stringify(r), CACHE_TTL);
    return r;
  }

  async createProduct(data: any) {
    const r = await this.p.create(data as any);
    await this.redis.del(cacheKey('products:*')); // Invalidate list cache
    return r;
  }
  async updateProduct(id: string, data: any) {
    const r = await this.p.findByPk(id);
    if (!r) throw new NotFoundException();
    const updated = await r.update(data);
    await this.redis.del(cacheKey(`product:${id}`));
    await this.redis.del(cacheKey('products:*'));
    return updated;
  }
  async deleteProduct(id: string) {
    const r = await this.p.findByPk(id);
    if (!r) throw new NotFoundException();
    await r.destroy();
    await this.redis.del(cacheKey(`product:${id}`));
    await this.redis.del(cacheKey('products:*'));
  }

  async createVariant(data: any) {
    return this.v.create(data as any);
  }
  async updateVariant(id: string, data: any) {
    const r = await this.v.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteVariant(id: string) {
    const r = await this.v.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async addMedia(productId: string, data: any) {
    return this.m.create({ ...data, productId } as any);
  }

  async findAllCategories() {
    return this.cat.findAll({ order: [['name', 'ASC']] });
  }
  async findAllCollections() {
    return this.col.findAll({ where: { active: true }, order: [['name', 'ASC']] });
  }
}
