import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  customerId?: string;

  @ApiProperty({ required: false, example: 'ORD-1712345678901' })
  orderNumber?: string;

  @ApiProperty({ example: 'pending' })
  status?: string;

  @ApiProperty({ example: 150.0 })
  subtotal?: number;

  @ApiProperty({ example: 0 })
  discount?: number;

  @ApiProperty({ example: 150.0 })
  total?: number;

  @ApiProperty({ required: false })
  notes?: string;
}
