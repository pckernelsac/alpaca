import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LogisticsController } from './logistics.controller';
import { LogisticsService } from './logistics.service';
import { Shipment } from './entities/shipment.entity';
import { ShipmentEvent } from './entities/shipment-event.entity';
import { Carrier } from './entities/carrier.entity';

@Module({
  imports: [SequelizeModule.forFeature([Shipment, ShipmentEvent, Carrier])],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [SequelizeModule],
})
export class LogisticsModule {}
