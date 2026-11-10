import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Laura',
  })
  @IsString()
  @IsNotEmpty()
  userFirstname!: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'García',
  })
  @IsString()
  @IsNotEmpty()
  userSurname!: string;

  @ApiProperty({
    description: 'Nombre de usuario único para inicio de sesión',
    example: 'lgarcia',
  })
  @IsString()
  @IsNotEmpty()
  userLogin!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  userPassword!: string;
}