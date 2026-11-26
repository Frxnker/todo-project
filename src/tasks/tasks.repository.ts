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

  // Devuelve solo las tareas de un usuario
  async findByUserId(userId: string): Promise<TasksEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return tasks.map((task) => TasksEntity.fromPrisma(task));
  }

  // Busca una tarea específica perteneciente al usuario especificado
  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<TasksEntity | null> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    return task ? TasksEntity.fromPrisma(task) : null;
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

  // Actualiza únicamente si pertenece a dicho usuario
  async updateByIdAndUserId(
    id: string,
    userId: string,
    data: { description?: string; completed?: boolean },
  ): Promise<TasksEntity> {
    const updatedTask = await this.prisma.task.update({
      where: {
        id: id,
        userId: userId,
      },
      data: data,
    });
    return TasksEntity.fromPrisma(updatedTask);
  }

  async delete(id: string): Promise<TasksEntity> {
    const deletedPrismaTask = await this.prisma.task.delete({ where: { id } });
    return TasksEntity.fromPrisma(deletedPrismaTask);
  }

  // Elimina únicamente si pertenece a dicho usuario
  async deleteByIdAndUserId(id: string, userId: string): Promise<TasksEntity> {
    const deletedTask = await this.prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
    return TasksEntity.fromPrisma(deletedTask);
  }
}