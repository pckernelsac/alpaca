import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({ example: 'WELCOME10' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'percentage', description: 'percentage | fixed' })
  @IsString()
  type: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  value: number;
}
