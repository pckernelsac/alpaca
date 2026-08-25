import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionRefund } from './entities/transaction-refund.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { OrderEvent } from '../orders/entities/order-event.entity';
import { StockItem } from '../inventory/entities/stock-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Transaction, TransactionRefund, Order, OrderItem, OrderEvent, StockItem])],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
  exports: [SequelizeModule, StripeService],
})
export class PaymentsModule {}
