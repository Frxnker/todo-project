import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'Identificador único en MongoDB (ObjectId)',
    example: '60d5ecb8b5c9c22b8c8e4111',
  })
  id!: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Laura',
  })
  userFirstname!: string;

  @ApiProperty({
    description: 'Apellidos del usuario',
    example: 'García',
  })
  userSurname!: string;

  @ApiProperty({
    description: 'Login del usuario',
    example: 'lgarcia',
  })
  userLogin!: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene privilegios de administrador',
    example: false,
  })
  isUserAdmin!: boolean;

  static fromEntity(user: User): UserResponseDto {
    return {
      id: user.id!,
      userFirstname: user.firstname,
      userSurname: user.surname,
      userLogin: user.login,
      isUserAdmin: user.admin,
    };
  }
}