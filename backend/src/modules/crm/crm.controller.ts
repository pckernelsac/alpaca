import { Controller, Get, Post, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CrmService } from './crm.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('CRM')
@Controller('crm')
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class CrmController {
  constructor(private readonly s: CrmService) {}
  @Get('clients') @ApiOperation({ summary: 'Listar clientes' }) findAll(@Query() q: any) {
    return this.s.findAll(q);
  }
  @Get('clients/:id') @ApiOperation({ summary: 'Obtener cliente' }) findById(@Param('id') id: string) {
    return this.s.findById(id);
  }
  @Post('clients') @ApiOperation({ summary: 'Crear cliente' }) create(@Body() b: any) {
    return this.s.create(b);
  }
  @Put('clients/:id') @ApiOperation({ summary: 'Actualizar cliente' }) update(@Param('id') id: string, @Body() b: any) {
    return this.s.update(id, b);
  }
  @Post('clients/:id/notes') @ApiOperation({ summary: 'Agregar nota' }) addNote(@Param('id') id: string, @Body() b: any) {
    return this.s.addNote(id, b);
  }
}
