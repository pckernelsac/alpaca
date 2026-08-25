import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { Campaign } from './entities/campaign.entity';
import { Coupon } from './entities/coupon.entity';
import { Promotion } from './entities/promotion.entity';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

@Module({
  imports: [SequelizeModule.forFeature([Campaign, Coupon, Promotion, NewsletterSubscriber])],
  controllers: [MarketingController],
  providers: [MarketingService],
  exports: [SequelizeModule],
})
export class MarketingModule {}
