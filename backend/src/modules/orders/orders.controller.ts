import { Controller, Get, Post, Put, Param, Body, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ActorGuard } from '../../common/guards/actor.guard';
import { Actor } from '../../common/decorators/actor.decorator';

@ApiTags('Orders')
@Controller()
@UseGuards(JwtAuthGuard, ActorGuard)
@Actor('staff', 'customer')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly s: OrdersService) {}
  @Get('orders') @ApiOperation({ summary: 'Listar pedidos' }) findAll(@Query() q: any, @Request() r: any) {
    if (r.user?.type === 'customer') q.customerId = r.user.id;
    return this.s.findAll(q);
  }
  @Get('orders/:id') @ApiOperation({ summary: 'Detalle del pedido' }) findById(@Param('id') id: string) {
    return this.s.findById(id);
  }
  @Post('orders') @ApiOperation({ summary: 'Crear pedido' }) create(@Body() b: any, @Request() r: any) {
    return this.s.create(b, r.user?.id);
  }
  @Put('orders/:id/status') @ApiOperation({ summary: 'Cambiar estado' }) updateStatus(
    @Param('id') id: string,
    @Body() b: any,
    @Request() r: any,
  ) {
    return this.s.updateStatus(id, b.status, r.user?.id);
  }
  @Post('orders/:id/notes') @ApiOperation({ summary: 'Agregar nota' }) addNote(@Param('id') id: string, @Body() b: any) {
    return this.s.addNote(id, b.notes);
  }
  @Get('orders/:id/events') @ApiOperation({ summary: 'Timeline del pedido' }) getEvents(@Param('id') id: string) {
    return this.s.getEvents(id);
  }
}
