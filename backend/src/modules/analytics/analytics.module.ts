import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../catalog/entities/product.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, Customer, Product, StockItem])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
