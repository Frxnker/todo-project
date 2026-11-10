import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        firstname: user.firstname,
        surname: user.surname,
        login: user.login,
        password: user.password,
        admin: user.admin ?? false,
      },
    });
    return User.fromPrisma(prismaUser);
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map((u) => User.fromPrisma(u));
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return prismaUser ? User.fromPrisma(prismaUser) : null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { login },
    });
    return prismaUser ? User.fromPrisma(prismaUser) : null;
  }

  async update(
    id: string,
    data: { firstname?: string; surname?: string; password?: string },
  ): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return User.fromPrisma(prismaUser);
  }

  async delete(id: string): Promise<User> {
    const prismaUser = await this.prisma.user.delete({
      where: { id },
    });
    return User.fromPrisma(prismaUser);
  }
}