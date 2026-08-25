import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CmsService } from './cms.service';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('CMS')
@Controller()
export class CmsController {
  constructor(private readonly s: CmsService) {}

  @Public() @Get('contents') @ApiOperation({ summary: 'Contenido público' }) findAll() {
    return this.s.findAll();
  }
  @Public() @Get('faq') @ApiOperation({ summary: 'FAQ' }) findFaq() {
    return this.s.findFaq();
  }
  @Public() @Get('hero-slides') @ApiOperation({ summary: 'Hero slides públicos' }) findHeroSlides() {
    return this.s.findHeroSlides();
  }
  @Public() @Get('gallery') @ApiOperation({ summary: 'Galería pública' }) findGallery() {
    return this.s.findGallery();
  }
  @Public() @Get('testimonials') @ApiOperation({ summary: 'Testimonios públicos' }) findTestimonials() {
    return this.s.findTestimonials();
  }
  @Public() @Get('benefits') @ApiOperation({ summary: 'Beneficios públicos' }) findBenefits() {
    return this.s.findBenefits();
  }
  @Public() @Get('artisan-processes') @ApiOperation({ summary: 'Proceso artesanal público' }) findArtisanProcesses() {
    return this.s.findArtisanProcesses();
  }

  // ─── CMS Admin ──────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('contents')
  @ApiOperation({ summary: 'Crear contenido' })
  create(@Body() b: any) {
    return this.s.create(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('contents/:id')
  @ApiOperation({ summary: 'Actualizar contenido' })
  update(@Param('id') id: string, @Body() b: any) {
    return this.s.update(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('contents/:id')
  @ApiOperation({ summary: 'Eliminar contenido' })
  delete(@Param('id') id: string) {
    return this.s.delete(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('admin/hero-slides')
  @ApiOperation({ summary: 'Listar hero slides (admin)' })
  findAllHeroSlides() {
    return this.s.findAllHeroSlides();
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('admin/hero-slides')
  @ApiOperation({ summary: 'Crear hero slide' })
  createHeroSlide(@Body() b: any) {
    return this.s.createHeroSlide(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('admin/hero-slides/:id')
  @ApiOperation({ summary: 'Actualizar hero slide' })
  updateHeroSlide(@Param('id') id: number, @Body() b: any) {
    return this.s.updateHeroSlide(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('admin/hero-slides/:id')
  @ApiOperation({ summary: 'Eliminar hero slide' })
  deleteHeroSlide(@Param('id') id: number) {
    return this.s.deleteHeroSlide(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('admin/gallery')
  @ApiOperation({ summary: 'Listar galería (admin)' })
  findAllGallery() {
    return this.s.findAllGallery();
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('admin/gallery')
  @ApiOperation({ summary: 'Crear imagen galería' })
  createGalleryImage(@Body() b: any) {
    return this.s.createGalleryImage(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('admin/gallery/:id')
  @ApiOperation({ summary: 'Actualizar imagen' })
  updateGalleryImage(@Param('id') id: number, @Body() b: any) {
    return this.s.updateGalleryImage(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('admin/gallery/:id')
  @ApiOperation({ summary: 'Eliminar imagen' })
  deleteGalleryImage(@Param('id') id: number) {
    return this.s.deleteGalleryImage(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('admin/testimonials')
  @ApiOperation({ summary: 'Listar testimonios (admin)' })
  findAllTestimonials() {
    return this.s.findAllTestimonials();
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('admin/testimonials')
  @ApiOperation({ summary: 'Crear testimonio' })
  createTestimonial(@Body() b: any) {
    return this.s.createTestimonial(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('admin/testimonials/:id')
  @ApiOperation({ summary: 'Actualizar testimonio' })
  updateTestimonial(@Param('id') id: number, @Body() b: any) {
    return this.s.updateTestimonial(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('admin/testimonials/:id')
  @ApiOperation({ summary: 'Eliminar testimonio' })
  deleteTestimonial(@Param('id') id: number) {
    return this.s.deleteTestimonial(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('admin/benefits')
  @ApiOperation({ summary: 'Listar beneficios (admin)' })
  findAllBenefits() {
    return this.s.findAllBenefits();
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('admin/benefits')
  @ApiOperation({ summary: 'Crear beneficio' })
  createBenefit(@Body() b: any) {
    return this.s.createBenefit(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('admin/benefits/:id')
  @ApiOperation({ summary: 'Actualizar beneficio' })
  updateBenefit(@Param('id') id: number, @Body() b: any) {
    return this.s.updateBenefit(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('admin/benefits/:id')
  @ApiOperation({ summary: 'Eliminar beneficio' })
  deleteBenefit(@Param('id') id: number) {
    return this.s.deleteBenefit(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Get('admin/artisan-processes')
  @ApiOperation({ summary: 'Listar procesos (admin)' })
  findAllArtisanProcesses() {
    return this.s.findAllArtisanProcesses();
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('admin/artisan-processes')
  @ApiOperation({ summary: 'Crear proceso' })
  createArtisanProcess(@Body() b: any) {
    return this.s.createArtisanProcess(b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('admin/artisan-processes/:id')
  @ApiOperation({ summary: 'Actualizar proceso' })
  updateArtisanProcess(@Param('id') id: number, @Body() b: any) {
    return this.s.updateArtisanProcess(id, b);
  }
  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('admin/artisan-processes/:id')
  @ApiOperation({ summary: 'Eliminar proceso' })
  deleteArtisanProcess(@Param('id') id: number) {
    return this.s.deleteArtisanProcess(id);
  }
}
