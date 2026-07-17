import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Warehouse } from './entities/warehouse.entity';
import { StockItem } from './entities/stock-item.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { WarehouseTransfer } from './entities/warehouse-transfer.entity';
import { WarehouseTransferItem } from './entities/warehouse-transfer-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Warehouse, StockItem, StockMovement, WarehouseTransfer, WarehouseTransferItem])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [SequelizeModule],
})
export class InventoryModule {}
