import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Request, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CustomerOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('Customers')
@Controller()
export class CustomersController {
  constructor(private readonly s: CustomersService) {}

  @Public()
  @Post('auth/register')
  @ApiOperation({ summary: 'Registro de cliente' })
  register(@Body() b: any) {
    return this.s.register(b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Get('account/profile')
  @ApiOperation({ summary: 'Mi perfil' })
  getProfile(@Request() r: any) {
    return this.s.getProfile(r.user.id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Put('account/profile')
  @ApiOperation({ summary: 'Actualizar perfil' })
  updateProfile(@Request() r: any, @Body() b: any) {
    return this.s.updateProfile(r.user.id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Put('account/password')
  @ApiOperation({ summary: 'Cambiar contraseña' })
  changePassword(@Request() r: any, @Body() b: any) {
    return this.s.changePassword(r.user.id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Get('account/addresses')
  @ApiOperation({ summary: 'Mis direcciones' })
  getAddresses(@Request() r: any) {
    return this.s.getAddresses(r.user.id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Post('account/addresses')
  @ApiOperation({ summary: 'Crear dirección' })
  createAddress(@Request() r: any, @Body() b: any) {
    return this.s.createAddress(r.user.id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Delete('account/addresses/:id')
  @ApiOperation({ summary: 'Eliminar dirección' })
  deleteAddress(@Request() r: any, @Param('id') id: number) {
    return this.s.deleteAddress(r.user.id, id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Get('wishlist')
  @ApiOperation({ summary: 'Lista de deseos' })
  getWishlist(@Request() r: any) {
    return this.s.getWishlist(r.user.id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Post('wishlist/items')
  @ApiOperation({ summary: 'Agregar/quitar de wishlist' })
  toggleWishlist(@Request() r: any, @Body() b: any) {
    return this.s.toggleWishlist(r.user.id, b.productId);
  }

  // ─── Cart ────────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Get('cart')
  @ApiOperation({ summary: 'Mi carrito' })
  getCart(@Request() r: any) {
    return this.s.getCart(r.user.id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Post('cart/items')
  @ApiOperation({ summary: 'Agregar al carrito' })
  addCartItem(@Request() r: any, @Body() b: any) {
    return this.s.addCartItem(r.user.id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Patch('cart/items/:id')
  @ApiOperation({ summary: 'Actualizar cantidad' })
  updateCartItem(@Request() r: any, @Param('id') id: number, @Body() b: any) {
    return this.s.updateCartItem(r.user.id, id, b);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Delete('cart/items/:id')
  @ApiOperation({ summary: 'Eliminar item del carrito' })
  removeCartItem(@Request() r: any, @Param('id') id: number) {
    return this.s.removeCartItem(r.user.id, id);
  }

  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Delete('cart')
  @ApiOperation({ summary: 'Vaciar carrito' })
  clearCart(@Request() r: any) {
    return this.s.clearCart(r.user.id);
  }

  // ─── Checkout ─────────────────────────────────────────────────────────
  @UseGuards(JwtAuthGuard, ActorGuard)
  @CustomerOnly()
  @ApiBearerAuth()
  @Post('checkout')
  @ApiOperation({ summary: 'Procesar checkout' })
  checkout(@Request() r: any, @Body() b: any, @Headers('Idempotency-Key') idempotencyKey?: string) {
    return this.s.checkout(r.user.id, { ...b, idempotencyKey });
  }
}
