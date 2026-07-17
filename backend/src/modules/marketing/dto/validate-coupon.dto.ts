import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateCouponDto {
  @ApiProperty({ example: 'WELCOME10' })
  @IsString()
  code: string;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cartSubtotal?: number;
}
