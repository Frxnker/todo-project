import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersRepository.findByLogin(
      createUserDto.userLogin,
    );
    if (existingUser) {
      throw new ConflictException('El login ya existe!');
    }
    // Aplicamos 10 rondas de salt a la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);
    const newUser = new User({
      firstname: createUserDto.userFirstname,
      surname: createUserDto.userSurname,
      login: createUserDto.userLogin,
      password: hashedPassword,
      admin: false,
    });
    const createdUser = await this.usersRepository.create(newUser);
    return UserResponseDto.fromEntity(createdUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => UserResponseDto.fromEntity(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return UserResponseDto.fromEntity(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.findOne(id);
    const updatedUser = await this.usersRepository.update(id, {
      ...(updateUserDto.userFirstname && {
        firstname: updateUserDto.userFirstname,
      }),
      ...(updateUserDto.userSurname && { surname: updateUserDto.userSurname }),
      ...(updateUserDto.userPassword && {
        password: await bcrypt.hash(updateUserDto.userPassword, 10),
      }),
    });
    return UserResponseDto.fromEntity(updatedUser);
  }

  async remove(id: string): Promise<UserResponseDto> {
    await this.findOne(id);
    const deletedUser = await this.usersRepository.delete(id);
    return UserResponseDto.fromEntity(deletedUser);
  }
}