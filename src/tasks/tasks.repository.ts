import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TasksEntity } from './tasks.entity';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TasksEntity[]> {
    const tasks = await this.prisma.task.findMany();
    return tasks.map((task) => TasksEntity.fromPrisma(task));
  }

  async findById(id: string): Promise<TasksEntity | null> {
    const prismaTask = await this.prisma.task.findUnique({ where: { id } });
    if (!prismaTask) return null;
    return TasksEntity.fromPrisma(prismaTask);
  }

  async create(data: {
    description: string;
    completed?: boolean;
    userId: string;
  }): Promise<TasksEntity> {
    const prismaTask = await this.prisma.task.create({ data });
    return TasksEntity.fromPrisma(prismaTask);
  }

  async update(
    id: string,
    data: { description?: string; completed?: boolean },
  ): Promise<TasksEntity> {
    const updatedPrismaTask = await this.prisma.task.update({
      where: { id },
      data,
    });
    return TasksEntity.fromPrisma(updatedPrismaTask);
  }

  async delete(id: string): Promise<TasksEntity> {
    const deletedPrismaTask = await this.prisma.task.delete({ where: { id } });
    return TasksEntity.fromPrisma(deletedPrismaTask);
  }
}