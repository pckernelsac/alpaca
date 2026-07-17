import { Controller, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';
import { ContactDto } from './dto/contact.dto';

@ApiTags('Settings')
@Controller()
export class SettingsController {
  constructor(private readonly s: SettingsService) {}

  @Public()
  @Get('settings/company')
  @ApiOperation({ summary: 'Obtener configuración empresa' })
  get() {
    return this.s.get();
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @StaffOnly()
  @ApiBearerAuth()
  @Put('settings/company')
  @ApiOperation({ summary: 'Actualizar configuración empresa' })
  update(@Body() b: any) {
    return this.s.update(b);
  }

  @Public()
  @Post('contact')
  @ApiOperation({ summary: 'Enviar formulario de contacto' })
  contact(@Body() dto: ContactDto) {
    return this.s.contact(dto);
  }
}
