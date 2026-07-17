import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private readonly stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {});
  }

  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    orderId: string;
    customerEmail?: string;
  }): Promise<Stripe.PaymentIntent> {
    if (params.amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const amountInCents = Math.round(params.amount * 100);

    return this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency: params.currency.toLowerCase() || 'usd',
      metadata: { orderId: params.orderId },
      receipt_email: params.customerEmail,
      automatic_payment_methods: { enabled: true },
    });
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.confirm(paymentIntentId);
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async createRefund(paymentIntentId: string, amount?: number, reason?: string): Promise<Stripe.Refund> {
    return this.stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: reason as Stripe.RefundCreateParams.Reason,
    });
  }

  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!;
    return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  getClient(): Stripe {
    return this.stripe;
  }
}
