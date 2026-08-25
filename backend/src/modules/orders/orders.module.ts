import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderEvent } from './entities/order-event.entity';
import { OrderDocument } from './entities/order-document.entity';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem, OrderEvent, OrderDocument])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [SequelizeModule],
})
export class OrdersModule {}
