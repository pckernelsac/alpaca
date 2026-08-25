import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password, dto.remember);
  }

  @Public()
  @Post('customer-login')
  @ApiOperation({ summary: 'Iniciar sesión (cliente B2C)' })
  customerLogin(@Body() dto: LoginDto) {
    return this.authService.customerLogin(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Perfil del usuario autenticado' })
  getProfile(@Request() req: any) {
    if (req.user.type === 'customer') return this.authService.getCustomerProfile(req.user.id);
    return this.authService.getProfile(req.user.id);
  }
}
