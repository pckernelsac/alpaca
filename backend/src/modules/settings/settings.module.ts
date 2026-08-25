import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CompanySetting, ContactInquiry } from './entities/company-setting.entity';

@Module({
  imports: [SequelizeModule.forFeature([CompanySetting, ContactInquiry])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SequelizeModule],
})
export class SettingsModule {}
