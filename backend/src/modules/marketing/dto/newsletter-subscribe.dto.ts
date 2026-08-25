import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsletterSubscribeDto {
  @ApiProperty({ example: 'cliente@alpacart.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hero-section', required: false })
  @IsOptional()
  @IsString()
  source?: string;
}
