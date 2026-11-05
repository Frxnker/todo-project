import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => UsersEntity.fromPrisma(user));
  }

  async findById(id: string): Promise<UsersEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    if (!prismaUser) return null;
    return UsersEntity.fromPrisma(prismaUser);
  }

  async findByLogin(login: string): Promise<UsersEntity | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { login } });
    if (!prismaUser) return null;
    return UsersEntity.fromPrisma(prismaUser);
  }

  async create(data: {
    firstname: string;
    surname: string;
    login: string;
    password: string;
    admin?: boolean;
  }): Promise<UsersEntity> {
    const prismaUser = await this.prisma.user.create({ data });
    return UsersEntity.fromPrisma(prismaUser);
  }

  async update(
    id: string,
    data: {
      firstname?: string;
      surname?: string;
      login?: string;
      password?: string;
      admin?: boolean;
    },
  ): Promise<UsersEntity> {
    const updatedPrismaUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return UsersEntity.fromPrisma(updatedPrismaUser);
  }

  async delete(id: string): Promise<UsersEntity> {
    const deletedPrismaUser = await this.prisma.user.delete({ where: { id } });
    return UsersEntity.fromPrisma(deletedPrismaUser);
  }
}