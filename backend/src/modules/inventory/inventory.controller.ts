import { Controller, Get, Post, Param, Body, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Inventory')
@Controller()
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('stock')
  @ApiOperation({ summary: 'Listar stock' })
  findAllStock(@Query() query: any) {
    return this.inventoryService.findAllStock(query);
  }

  @Post('stock/:id/adjust')
  @ApiOperation({ summary: 'Ajustar stock' })
  adjustStock(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.inventoryService.adjustStock(id, body.quantity, body.reason, body.warehouseId, req.user?.id);
  }

  @Get('movements')
  @ApiOperation({ summary: 'Listar movimientos' })
  findAllMovements(@Query() query: any) {
    return this.inventoryService.findAllMovements(query);
  }

  @Get('transfers')
  @ApiOperation({ summary: 'Listar transferencias' })
  findAllTransfers(@Query() query: any) {
    return this.inventoryService.findAllTransfers(query);
  }
}
