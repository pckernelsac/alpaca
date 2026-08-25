import { Controller, Get, Post, Param, Body, Query, Request, UseGuards, Headers, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Get('transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar transacciones' })
  findAll(@Query() query: any) {
    return this.paymentsService.findAll(query);
  }

  @Post('create-payment-intent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear Payment Intent (Stripe)' })
  createPaymentIntent(@Body() body: { items: any[]; customerId: string; subtotal: number; discount: number; total: number; currency: string; couponId?: number | null; customerEmail?: string }) {
    return this.paymentsService.createPaymentIntent(body);
  }

  @Post('transactions/:id/refund')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reembolsar transacción' })
  refund(@Param('id') id: string, @Body() body: { amount: number; reason: string }, @Request() req: any) {
    return this.paymentsService.refund(id, body.amount, body.reason, req.user?.id);
  }

  @Public()
  @Post('stripe/webhook')
  @ApiOperation({ summary: 'Webhook Stripe' })
  async webhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.handleWebhook(req.rawBody, signature);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('reservations/release-expired')
  @ApiOperation({ summary: 'Liberar reservas expiradas' })
  releaseExpired() {
    return this.paymentsService.releaseExpiredReservations();
  }
}
