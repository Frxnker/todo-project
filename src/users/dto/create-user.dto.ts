import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Francisco' })
  @IsString()
  @IsNotEmpty()
  firstnameUser!: string;

  @ApiProperty({ description: 'Apellidos del usuario', example: 'López Lobanova' })
  @IsString()
  @IsNotEmpty()
  surnameUser!: string;

  @ApiProperty({ description: 'Login único del usuario', example: 'frank' })
  @IsString()
  @IsNotEmpty()
  loginUser!: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: '123456' })
  @IsString()
  @IsNotEmpty()
  passwordUser!: string;

  @ApiProperty({ description: 'Si el usuario es administrador', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  adminUser?: boolean = false;
}