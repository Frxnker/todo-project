import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  // Solo las tareas del usuario autenticado
  async getAllTasks(userId: string): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.findByUserId(userId);
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  // Una tarea, solo si pertenece al usuario autenticado
  async getOneTask(id: string, userId: string): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.findByIdAndUserId(id, userId);
    if (!task) {
      throw new NotFoundException(
        `La tarea con el ID "${id}" no existe o no te pertenece`,
      );
    }
    return this.mapToResponseDto(task);
  }

  // El userId llega del token, no del body
  async createOneTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<TaskResponseDto> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new NotFoundException(`El usuario con ID "${userId}" no existe`);
    }

    const newTask = await this.tasksRepository.create({
      description: createTaskDto.descriptionTask,
      userId: userId, // Usamos el id del usuario autenticado
      completed: createTaskDto.completedTask ?? false,
    });
    return this.mapToResponseDto(newTask);
  }

  async deleteOneTask(id: string, userId: string): Promise<TaskResponseDto> {
    await this.getOneTask(id, userId); // Validamos que existe y le pertenece
    const deletedTask = await this.tasksRepository.deleteByIdAndUserId(
      id,
      userId,
    );
    return this.mapToResponseDto(deletedTask);
  }

  async updateOneTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<TaskResponseDto> {
    await this.getOneTask(id, userId); // Validamos que existe y le pertenece
    const updatedTask = await this.tasksRepository.updateByIdAndUserId(
      id,
      userId,
      {
        description: updateTaskDto.descriptionTask,
        completed: updateTaskDto.completedTask,
      },
    );
    return this.mapToResponseDto(updatedTask);
  }

  private mapToResponseDto(task: TasksEntity): TaskResponseDto {
    return {
      idTask: task.id,
      descriptionTask: task.description,
      completedTask: task.isCompleted(),
      idUser: task.userId,
    };
  }
}