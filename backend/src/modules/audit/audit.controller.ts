import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Audit')
@Controller('audit')
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly s: AuditService) {}

  @Get('logs')
  @ApiOperation({ summary: 'Listar logs de auditoría' })
  findAll(@Query() q: any) {
    return this.s.findAll(q);
  }
}
