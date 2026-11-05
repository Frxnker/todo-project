import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.mapToResponseDto(user));
  }

  async getOneUser(id: string): Promise<UserResponseDto> {
    const user = await this.findUserOrFail(id);
    return this.mapToResponseDto(user);
  }

  async createOneUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this.checkLoginIsFree(createUserDto.loginUser);

    const newUser = await this.usersRepository.create({
      firstname: createUserDto.firstnameUser,
      surname: createUserDto.surnameUser,
      login: createUserDto.loginUser,
      password: createUserDto.passwordUser,
      admin: createUserDto.adminUser ?? false,
    });
    return this.mapToResponseDto(newUser);
  }

  async updateOneUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.findUserOrFail(id);

    // Si cambia el login, comprobamos que el nuevo no lo tenga otro usuario
    if (updateUserDto.loginUser && updateUserDto.loginUser !== user.login) {
      await this.checkLoginIsFree(updateUserDto.loginUser);
    }

    const updatedUser = await this.usersRepository.update(id, {
      firstname: updateUserDto.firstnameUser,
      surname: updateUserDto.surnameUser,
      login: updateUserDto.loginUser,
      password: updateUserDto.passwordUser,
      admin: updateUserDto.adminUser,
    });
    return this.mapToResponseDto(updatedUser);
  }

  async deleteOneUser(id: string): Promise<UserResponseDto> {
    await this.findUserOrFail(id);
    const deletedUser = await this.usersRepository.delete(id);
    return this.mapToResponseDto(deletedUser);
  }

  // ----- Métodos privados de apoyo -----

  private async findUserOrFail(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user)
      throw new NotFoundException(`El usuario con el ID "${id}" no existe`);
    return user;
  }

  private async checkLoginIsFree(login: string): Promise<void> {
    const existing = await this.usersRepository.findByLogin(login);
    if (existing)
      throw new ConflictException(`El login "${login}" ya está en uso`);
  }

  private mapToResponseDto(user: UsersEntity): UserResponseDto {
    return {
      idUser: user.id,
      firstnameUser: user.firstname,
      surnameUser: user.surname,
      loginUser: user.login,
      adminUser: user.isAdmin(),
      // La contraseña NO se devuelve nunca
    };
  }
}