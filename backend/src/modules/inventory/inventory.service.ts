import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Warehouse } from './entities/warehouse.entity';
import { StockItem } from './entities/stock-item.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { WarehouseTransfer } from './entities/warehouse-transfer.entity';
import { WarehouseTransferItem } from './entities/warehouse-transfer-item.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Warehouse) private warehouseModel: typeof Warehouse,
    @InjectModel(StockItem) private stockModel: typeof StockItem,
    @InjectModel(StockMovement) private movementModel: typeof StockMovement,
    @InjectModel(WarehouseTransfer) private transferModel: typeof WarehouseTransfer,
  ) {}

  async findAllStock(query: any) {
    const { page = 1, perPage = 25, warehouseId } = query;
    const where: any = {};
    if (warehouseId) where.warehouseId = warehouseId;
    return this.stockModel.findAndCountAll({
      where,
      include: [Warehouse],
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
    });
  }

  async adjustStock(productId: string, quantity: number, reason: string, warehouseId: number, personId?: string) {
    let item = await this.stockModel.findOne({ where: { productId, warehouseId } });
    if (!item) {
      item = await this.stockModel.create({ productId, warehouseId, quantity: 0, variantId: null } as any);
    }
    const diff = quantity - item.quantity;
    await item.update({ quantity, lastMovementAt: new Date() });
    await this.movementModel.create({
      movementNumber: `MOV-${Date.now()}`,
      productId,
      warehouseId,
      type: 'adjustment',
      quantity: diff,
      balance: quantity,
      reason,
      personId,
    } as any);
    return item;
  }

  async findAllMovements(query: any) {
    const { page = 1, perPage = 25, type } = query;
    const where: any = {};
    if (type) where.type = type;
    return this.movementModel.findAndCountAll({
      where,
      limit: Math.min(perPage, 200),
      offset: (page - 1) * perPage,
      order: [['createdAt', 'DESC']],
    });
  }

  async findAllTransfers(query: any) {
    return this.transferModel.findAndCountAll({
      include: [WarehouseTransferItem],
      limit: Math.min(query.perPage || 25, 200),
      offset: ((query.page || 1) - 1) * (query.perPage || 25),
      order: [['createdAt', 'DESC']],
    });
  }
}
