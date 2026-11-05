import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly us: UsersService) {}

  @Get()
  index(): Promise<UserResponseDto[]> {
    return this.us.getAllUsers();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<UserResponseDto> {
    return this.us.getOneUser(id);
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.us.createOneUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.us.updateOneUser(id, updateUserDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: string): Promise<UserResponseDto> {
    return this.us.deleteOneUser(id);
  }
}