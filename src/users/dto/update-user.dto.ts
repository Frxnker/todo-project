import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Nombre del usuario', example: 'Francisco' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstnameUser?: string;

  @ApiPropertyOptional({ description: 'Apellidos del usuario', example: 'López Lobanova' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  surnameUser?: string;

  @ApiPropertyOptional({ description: 'Login único del usuario', example: 'frank' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  loginUser?: string;

  @ApiPropertyOptional({ description: 'Contraseña del usuario', example: '654321' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  passwordUser?: string;

  @ApiPropertyOptional({ description: 'Si el usuario es administrador', example: true })
  @IsBoolean()
  @IsOptional()
  adminUser?: boolean;
}