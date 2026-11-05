import { Task as PrismaTask } from '@prisma/client';

export class TasksEntity {
  id!: string;
  description!: string;
  completed!: boolean;
  userId!: string;

  constructor(partial?: Partial<TasksEntity>) {
    Object.assign(this, partial);
  }

  static fromPrisma(prismaTask: PrismaTask): TasksEntity {
    return new TasksEntity({
      id: prismaTask.id,
      description: prismaTask.description,
      completed: prismaTask.completed,
      userId: prismaTask.userId,
    });
  }

  isCompleted(): boolean {
    return this.completed;
  }
}