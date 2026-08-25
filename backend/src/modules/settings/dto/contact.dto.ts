import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ example: 'Mateo Quispe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'mateo.q@alpacart.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Consulta sobre productos' })
  @IsString()
  @MinLength(2)
  subject: string;

  @ApiProperty({ example: 'Hola, me gustaría saber más sobre...' })
  @IsString()
  @MinLength(2)
  message: string;
}
