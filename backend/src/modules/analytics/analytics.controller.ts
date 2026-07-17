import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly s: AnalyticsService) {}

  @Get('kpis')
  @ApiOperation({ summary: 'Obtener KPIs del dashboard' })
  getKpis() {
    return this.s.getKpis();
  }
}
