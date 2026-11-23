import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Nombre de usuario (login)', example: 'lgarcia' })
  @IsString()
  @IsNotEmpty()
  login!: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}