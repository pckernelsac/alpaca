import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { CustomerAddress } from './entities/customer-address.entity';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Review } from './entities/review.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../catalog/entities/product.entity';
import { ProductVariant } from '../catalog/entities/product-variant.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { OrderEvent } from '../orders/entities/order-event.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';
import { Coupon } from '../marketing/entities/coupon.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Customer,
      CustomerAddress,
      WishlistItem,
      Review,
      Cart,
      CartItem,
      Product,
      ProductVariant,
      Order,
      OrderItem,
      OrderEvent,
      StockItem,
      Coupon,
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [SequelizeModule],
})
export class CustomersModule {}
