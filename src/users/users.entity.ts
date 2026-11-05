import { User as PrismaUser } from '@prisma/client';

export class UsersEntity {
  id!: string;
  firstname!: string;
  surname!: string;
  login!: string;
  password!: string;
  admin!: boolean;

  constructor(partial?: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }

  static fromPrisma(prismaUser: PrismaUser): UsersEntity {
    return new UsersEntity({
      id: prismaUser.id,
      firstname: prismaUser.firstname,
      surname: prismaUser.surname,
      login: prismaUser.login,
      password: prismaUser.password,
      admin: prismaUser.admin,
    });
  }

  isAdmin(): boolean {
    return this.admin;
  }
}