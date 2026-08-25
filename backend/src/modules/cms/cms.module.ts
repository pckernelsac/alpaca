import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { Content } from './entities/content.entity';
import { FaqCategory, FaqItem } from './entities/faq.entity';
import { HeroSlide } from './entities/hero-slide.entity';
import { GalleryImage } from './entities/gallery-image.entity';
import { Testimonial } from './entities/testimonial.entity';
import { Benefit } from './entities/benefit.entity';
import { ArtisanProcess } from './entities/artisan-process.entity';

@Module({
  imports: [SequelizeModule.forFeature([Content, FaqCategory, FaqItem, HeroSlide, GalleryImage, Testimonial, Benefit, ArtisanProcess])],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [SequelizeModule],
})
export class CmsModule {}
