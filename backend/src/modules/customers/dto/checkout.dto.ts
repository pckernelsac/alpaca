import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty({ required: false, example: 'WELCOME10' })
  @IsOptional()
  @IsString()
  couponCode?: string;

  @ApiProperty({ required: false, description: 'Idempotency-Key header' })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}
