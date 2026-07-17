import { IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({ required: false, example: 'Alpacart Textiles S.A.C.' })
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiProperty({ required: false, example: '20123456789' })
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiProperty({ required: false, example: 'info@alpacart.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: '+51 123 456 789' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: 'Av. Principal 123, Lima, Perú' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, example: 'https://alpacart.com' })
  @IsOptional()
  @IsUrl()
  website?: string;
}
