import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Content } from './entities/content.entity';
import { FaqCategory, FaqItem } from './entities/faq.entity';
import { HeroSlide } from './entities/hero-slide.entity';
import { GalleryImage } from './entities/gallery-image.entity';
import { Testimonial } from './entities/testimonial.entity';
import { Benefit } from './entities/benefit.entity';
import { ArtisanProcess } from './entities/artisan-process.entity';

@Injectable()
export class CmsService {
  constructor(
    @InjectModel(Content) private c: typeof Content,
    @InjectModel(FaqCategory) private fc: typeof FaqCategory,
    @InjectModel(FaqItem) private fi: typeof FaqItem,
    @InjectModel(HeroSlide) private hs: typeof HeroSlide,
    @InjectModel(GalleryImage) private gi: typeof GalleryImage,
    @InjectModel(Testimonial) private t: typeof Testimonial,
    @InjectModel(Benefit) private b: typeof Benefit,
    @InjectModel(ArtisanProcess) private ap: typeof ArtisanProcess,
  ) {}
  async findAll() {
    return this.c.findAll({ order: [['createdAt', 'DESC']] });
  }
  async create(data: any) {
    return this.c.create(data as any);
  }
  async update(id: string, data: any) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async delete(id: string) {
    const r = await this.c.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }
  async findFaq() {
    return this.fc.findAll({ include: [FaqItem] as any });
  }
  async findHeroSlides() {
    return this.hs.findAll({ where: { active: true }, order: [['order', 'ASC']] });
  }
  async findGallery() {
    return this.gi.findAll({ where: { visible: true }, order: [['order', 'ASC']] });
  }
  async findTestimonials() {
    return this.t.findAll({ where: { active: true }, order: [['order', 'ASC']] });
  }
  async findBenefits() {
    return this.b.findAll({ where: { active: true }, order: [['order', 'ASC']] });
  }
  async findArtisanProcesses() {
    return this.ap.findAll({ where: { active: true }, order: [['stepOrder', 'ASC']] });
  }

  // ─── CMS Admin CRUD ─────────────────────────────────────────────────
  async findAllHeroSlides() {
    return this.hs.findAll({ order: [['order', 'ASC']] });
  }
  async createHeroSlide(data: any) {
    return this.hs.create(data as any);
  }
  async updateHeroSlide(id: number, data: any) {
    const r = await this.hs.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteHeroSlide(id: number) {
    const r = await this.hs.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async findAllGallery() {
    return this.gi.findAll({ order: [['order', 'ASC']] });
  }
  async createGalleryImage(data: any) {
    return this.gi.create(data as any);
  }
  async updateGalleryImage(id: number, data: any) {
    const r = await this.gi.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteGalleryImage(id: number) {
    const r = await this.gi.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async findAllTestimonials() {
    return this.t.findAll({ order: [['order', 'ASC']] });
  }
  async createTestimonial(data: any) {
    return this.t.create(data as any);
  }
  async updateTestimonial(id: number, data: any) {
    const r = await this.t.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteTestimonial(id: number) {
    const r = await this.t.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async findAllBenefits() {
    return this.b.findAll({ order: [['order', 'ASC']] });
  }
  async createBenefit(data: any) {
    return this.b.create(data as any);
  }
  async updateBenefit(id: number, data: any) {
    const r = await this.b.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteBenefit(id: number) {
    const r = await this.b.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }

  async findAllArtisanProcesses() {
    return this.ap.findAll({ order: [['stepOrder', 'ASC']] });
  }
  async createArtisanProcess(data: any) {
    return this.ap.create(data as any);
  }
  async updateArtisanProcess(id: number, data: any) {
    const r = await this.ap.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.update(data);
  }
  async deleteArtisanProcess(id: number) {
    const r = await this.ap.findByPk(id);
    if (!r) throw new NotFoundException();
    return r.destroy();
  }
}
