import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroSlideDto {
  @ApiProperty({ example: 'Nueva Colección Verano 2025' })
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Descubre la suavidad de la alpaca' })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ required: false, example: 'Compra Ahora' })
  @IsOptional()
  @IsString()
  ctaText?: string;

  @ApiProperty({ required: false, example: '/coleccion/verano' })
  @IsOptional()
  @IsString()
  ctaLink?: string;

  @ApiProperty({ required: false, example: 'https://cdn.alpacart.com/slides/verano.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
