import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompanySetting, ContactInquiry } from './entities/company-setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(CompanySetting) private cs: typeof CompanySetting,
    @InjectModel(ContactInquiry) private ci: typeof ContactInquiry,
  ) {}
  async get() {
    let s = await this.cs.findOne();
    if (!s) s = await this.cs.create({ legalName: 'Alpacart Textiles S.A.C.', taxId: '', email: 'info@alpacart.com' } as any);
    return s;
  }
  async update(data: any) {
    const s = await this.cs.findOne();
    if (!s) return this.cs.create(data as any);
    return s.update(data);
  }
  async contact(data: any) {
    return this.ci.create(data as any);
  }
}
