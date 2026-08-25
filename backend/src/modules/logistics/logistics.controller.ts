import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LogisticsService } from './logistics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Logistics')
@Controller()
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class LogisticsController {
  constructor(private readonly s: LogisticsService) {}

  @Get('shipments') @ApiOperation({ summary: 'Listar envíos' }) findAll(@Query() q: any) {
    return this.s.findAllShipments(q);
  }
  @Post('shipments') @ApiOperation({ summary: 'Crear envío' }) create(@Body() b: any) {
    return this.s.createShipment(b);
  }
  @Put('shipments/:id/status') @ApiOperation({ summary: 'Actualizar estado' }) updateStatus(@Param('id') id: string, @Body() b: any) {
    return this.s.updateStatus(id, b);
  }
  @Get('carriers') @ApiOperation({ summary: 'Listar transportistas' }) findAllCarriers() {
    return this.s.findAllCarriers();
  }
}
