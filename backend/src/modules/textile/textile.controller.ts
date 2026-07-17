import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TextileService } from './textile.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Textile')
@Controller('textile')
export class TextileController {
  constructor(private readonly textileService: TextileService) {}

  @Public()
  @Get('materials')
  @ApiOperation({ summary: 'Listar fibras/materials' })
  findAllMaterials() {
    return this.textileService.findAllMaterials();
  }

  @Public()
  @Get('colors')
  @ApiOperation({ summary: 'Listar colores textiles' })
  findAllColors() {
    return this.textileService.findAllColors();
  }

  @Public()
  @Get('sizes')
  @ApiOperation({ summary: 'Listar tallas' })
  findAllSizes() {
    return this.textileService.findAllSizes();
  }

  @Public()
  @Get('seasons')
  @ApiOperation({ summary: 'Listar temporadas' })
  findAllSeasons() {
    return this.textileService.findAllSeasons();
  }
}
