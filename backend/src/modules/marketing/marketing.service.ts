import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from './entities/campaign.entity';
import { Coupon } from './entities/coupon.entity';
import { Promotion } from './entities/promotion.entity';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

@Injectable()
export class MarketingService {
  constructor(
    @InjectModel(Campaign) private c: typeof Campaign,
    @InjectModel(Coupon) private co: typeof Coupon,
    @InjectModel(Promotion) private p: typeof Promotion,
    @InjectModel(NewsletterSubscriber) private n: typeof NewsletterSubscriber,
  ) {}

  async findAllCampaigns(q: any = {}) {
    const where: any = {};
    if (q.status) where.status = q.status;
    if (q.type) where.type = q.type;
    return this.c.findAll({ where, order: [['createdAt', 'DESC']] });
  }
  async findCampaignById(id: string) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r;
  }
  async createCampaign(data: any) {
    return this.c.create(data as any);
  }
  async updateCampaign(id: string, data: any) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteCampaign(id: string) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  // ─── Coupons ─────────────────────────────────────────────────────────
  async findAllCoupons() {
    return this.co.findAll({ order: [['createdAt', 'DESC']] });
  }
  async findCouponById(id: number) {
    const r = await this.co.findByPk(id);
    if (!r) throw new NotFoundException();
    return r;
  }
  async createCoupon(data: any) {
    return this.co.create(data as any);
  }
  async updateCoupon(id: number, data: any) {
    const r = await this.co.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteCoupon(id: number) {
    const r = await this.co.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }
  async validateCoupon(code: string, cartSubtotal = 0) {
    const now = new Date();
    const coupon = await this.co.findOne({ where: { code, active: true } });
    if (!coupon) throw new BadRequestException('Cupón no válido');
    if (coupon.expiresAt && new Date(coupon.expiresAt) < now) throw new BadRequestException('Cupón expirado');
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) throw new BadRequestException('Cupón agotado');
    if (coupon.minPurchase && cartSubtotal < Number(coupon.minPurchase)) {
      throw new BadRequestException(`Compra mínima de $${Number(coupon.minPurchase).toFixed(2)} para este cupón`);
    }
    let discount = 0;
    if (coupon.type === 'percentage') discount = cartSubtotal * (Number(coupon.value) / 100);
    else discount = Number(coupon.value);
    return { valid: true, code: coupon.code, type: coupon.type, value: Number(coupon.value), discount, message: 'Cupón aplicado' };
  }

  // ─── Promotions ──────────────────────────────────────────────────────
  async findAllPromotions() {
    return this.p.findAll({ order: [['createdAt', 'DESC']] });
  }
  async findPromotionById(id: number) {
    const r = await this.p.findByPk(id);
    if (!r) throw new NotFoundException();
    return r;
  }
  async createPromotion(data: any) {
    return this.p.create(data as any);
  }
  async updatePromotion(id: number, data: any) {
    const r = await this.p.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deletePromotion(id: number) {
    const r = await this.p.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  // ─── Newsletter ──────────────────────────────────────────────────────
  async subscribe(email: string) {
    const existing = await this.n.findOne({ where: { email } });
    if (existing) return existing;
    return this.n.create({ email, source: 'web', active: true } as any);
  }
}
