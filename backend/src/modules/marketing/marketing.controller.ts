import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';
import { NewsletterSubscribeDto } from './dto/newsletter-subscribe.dto';

@ApiTags('Marketing')
@Controller()
export class MarketingController {
  constructor(private readonly s: MarketingService) {}

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('campaigns')
  @ApiOperation({ summary: 'Listar campañas' })
  findAllCampaigns(@Query() q: any) {
    return this.s.findAllCampaigns(q);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('campaigns/:id')
  @ApiOperation({ summary: 'Obtener campaña' })
  findCampaign(@Param('id') id: string) {
    return this.s.findCampaignById(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('campaigns')
  @ApiOperation({ summary: 'Crear campaña' })
  createCampaign(@Body() b: any) {
    return this.s.createCampaign(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('campaigns/:id')
  @ApiOperation({ summary: 'Actualizar campaña' })
  updateCampaign(@Param('id') id: string, @Body() b: any) {
    return this.s.updateCampaign(id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('campaigns/:id')
  @ApiOperation({ summary: 'Eliminar campaña' })
  deleteCampaign(@Param('id') id: string) {
    return this.s.deleteCampaign(id);
  }

  // ─── Coupons ─────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('coupons')
  @ApiOperation({ summary: 'Listar cupones' })
  findAllCoupons() {
    return this.s.findAllCoupons();
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('coupons/:id')
  @ApiOperation({ summary: 'Obtener cupón' })
  findCoupon(@Param('id') id: number) {
    return this.s.findCouponById(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('coupons')
  @ApiOperation({ summary: 'Crear cupón' })
  createCoupon(@Body() b: any) {
    return this.s.createCoupon(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('coupons/:id')
  @ApiOperation({ summary: 'Actualizar cupón' })
  updateCoupon(@Param('id') id: number, @Body() b: any) {
    return this.s.updateCoupon(id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('coupons/:id')
  @ApiOperation({ summary: 'Eliminar cupón' })
  deleteCoupon(@Param('id') id: number) {
    return this.s.deleteCoupon(id);
  }

  @Public()
  @Post('coupons/validate')
  @ApiOperation({ summary: 'Validar cupón' })
  validateCoupon(@Body() b: any) {
    return this.s.validateCoupon(b.code, b.cartSubtotal);
  }

  // ─── Promotions ──────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('promotions')
  @ApiOperation({ summary: 'Listar promociones' })
  findAllPromotions() {
    return this.s.findAllPromotions();
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('promotions/:id')
  @ApiOperation({ summary: 'Obtener promoción' })
  findPromotion(@Param('id') id: number) {
    return this.s.findPromotionById(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('promotions')
  @ApiOperation({ summary: 'Crear promoción' })
  createPromotion(@Body() b: any) {
    return this.s.createPromotion(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('promotions/:id')
  @ApiOperation({ summary: 'Actualizar promoción' })
  updatePromotion(@Param('id') id: number, @Body() b: any) {
    return this.s.updatePromotion(id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('promotions/:id')
  @ApiOperation({ summary: 'Eliminar promoción' })
  deletePromotion(@Param('id') id: number) {
    return this.s.deletePromotion(id);
  }

  // ─── Newsletter ──────────────────────────────────────────────────────
  @Public()
  @Post('newsletter/subscribe')
  @ApiOperation({ summary: 'Suscribirse al newsletter' })
  subscribe(@Body() dto: NewsletterSubscribeDto) {
    return this.s.subscribe(dto.email);
  }
}
