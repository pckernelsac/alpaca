import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'mateo.q@alpacart.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Mateo' })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Quispe' })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  @MinLength(6)
  password: string;
}
