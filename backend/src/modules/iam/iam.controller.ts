import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IamService } from './iam.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { StaffOnly } from '../../common/decorators/actor.decorator';
import { ActorGuard } from '../../common/guards/actor.guard';

@ApiTags('IAM')
@Controller()
@UseGuards(JwtAuthGuard, ActorGuard)
@StaffOnly()
@ApiBearerAuth()
export class IamController {
  constructor(private readonly s: IamService) {}

  @Get('users') @ApiOperation({ summary: 'Listar usuarios' }) findAllUsers(@Query() q: any) {
    return this.s.findAllUsers(q);
  }
  @Get('users/:id') @ApiOperation({ summary: 'Obtener usuario' }) findUser(@Param('id') id: string) {
    return this.s.findUserById(id);
  }
  @Post('users') @ApiOperation({ summary: 'Crear usuario' }) createUser(@Body() b: any) {
    return this.s.createUser(b);
  }
  @Put('users/:id') @ApiOperation({ summary: 'Actualizar usuario' }) updateUser(@Param('id') id: string, @Body() b: any) {
    return this.s.updateUser(id, b);
  }
  @Delete('users/:id') @ApiOperation({ summary: 'Eliminar usuario' }) deleteUser(@Param('id') id: string) {
    return this.s.deleteUser(id);
  }
  @Put('users/:id/status') @ApiOperation({ summary: 'Cambiar estado usuario' }) updateStatus(@Param('id') id: string, @Body() b: any) {
    return this.s.updateStatus(id, b);
  }
  @Get('roles') @ApiOperation({ summary: 'Listar roles' }) findAllRoles() {
    return this.s.findAllRoles();
  }
  @Post('roles') @ApiOperation({ summary: 'Crear rol' }) createRole(@Body() b: any) {
    return this.s.createRole(b);
  }
  @Put('roles/:id') @ApiOperation({ summary: 'Actualizar rol' }) updateRole(@Param('id') id: number, @Body() b: any) {
    return this.s.updateRole(id, b);
  }
  @Delete('roles/:id') @ApiOperation({ summary: 'Eliminar rol' }) deleteRole(@Param('id') id: number) {
    return this.s.deleteRole(id);
  }
  @Get('permissions') @ApiOperation({ summary: 'Listar permisos' }) findAllPermissions() {
    return this.s.findAllPermissions();
  }
  @Put('permissions/matrix') @ApiOperation({ summary: 'Guardar matriz de permisos' }) saveMatrix(@Body() b: any) {
    return this.s.saveMatrix(b);
  }
}
