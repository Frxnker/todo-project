import { User as PrismaUser } from '@prisma/client';

export class User {
  id?: string;
  firstname!: string;
  surname!: string;
  login!: string;
  password!: string;
  admin!: boolean;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  static fromPrisma(prismaUser: PrismaUser): User {
    return new User({
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