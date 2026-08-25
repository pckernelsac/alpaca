import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Category } from './entities/category.entity';
import { Collection } from './entities/collection.entity';
import { ProductMedia } from './entities/product-media.entity';
import { Tag, ProductTag } from './entities/tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductVariant, Category, Collection, ProductMedia, Tag, ProductTag])],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService, SequelizeModule],
})
export class CatalogModule {}
