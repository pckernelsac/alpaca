import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Catalog')
@Controller()
export class CatalogController {
  constructor(private readonly s: CatalogService) {}

  @Public() @Get('products') findAll(@Query() q: any) {
    return this.s.findAllProducts(q);
  }
  @Public() @Get('products/:id') findOne(@Param('id') id: string) {
    return this.s.findProductById(id);
  }
  @Public() @Get('categories') findAllCategories() {
    return this.s.findAllCategories();
  }
  @Public() @Get('collections') findAllCollections() {
    return this.s.findAllCollections();
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('products')
  @ApiOperation({ summary: 'Crear producto' })
  create(@Body() b: any) {
    return this.s.createProduct(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('products/:id')
  @ApiOperation({ summary: 'Actualizar producto' })
  update(@Param('id') id: string, @Body() b: any) {
    return this.s.updateProduct(id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('products/:id')
  @ApiOperation({ summary: 'Eliminar producto' })
  delete(@Param('id') id: string) {
    return this.s.deleteProduct(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('variants')
  @ApiOperation({ summary: 'Crear variante' })
  createVariant(@Body() b: any) {
    return this.s.createVariant(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('variants/:id')
  @ApiOperation({ summary: 'Actualizar variante' })
  updateVariant(@Param('id') id: string, @Body() b: any) {
    return this.s.updateVariant(id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Delete('variants/:id')
  @ApiOperation({ summary: 'Eliminar variante' })
  deleteVariant(@Param('id') id: string) {
    return this.s.deleteVariant(id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Post('products/:id/media')
  @ApiOperation({ summary: 'Subir imagen' })
  uploadMedia(@Param('id') id: string, @Body() b: any) {
    return this.s.addMedia(id, b);
  }
}
