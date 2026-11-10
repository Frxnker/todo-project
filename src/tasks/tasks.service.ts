import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { TasksEntity } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { UsersRepository } from '../users/users.repository'; // 1. Importamos UsersRepository

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository, // 2. Inyección de dependencia
  ) {}

  async getAllTasks(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.findAll();
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  async getOneTask(id: string): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.findById(id);
    if (!task)
      throw new NotFoundException(`La tarea con el ID "${id}" no existe`);
    return this.mapToResponseDto(task);
  }

  async createOneTask(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    // 3. Validamos la existencia del usuario
    const userExists = await this.usersRepository.findById(createTaskDto.idUser);
    if (!userExists) {
      throw new NotFoundException(
        `El usuario con ID "${createTaskDto.idUser}" no existe`,
      );
    }

    const newTask = await this.tasksRepository.create({
      description: createTaskDto.descriptionTask,
      userId: createTaskDto.idUser,
      completed: createTaskDto.completedTask ?? false,
    });
    return this.mapToResponseDto(newTask);
  }

  async deleteOneTask(id: string): Promise<TaskResponseDto> {
    await this.getOneTask(id); // Reutilizamos la verificación de existencia
    const deletedTask = await this.tasksRepository.delete(id);
    return this.mapToResponseDto(deletedTask);
  }

  async updateOneTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    await this.getOneTask(id); // Reutilizamos la verificación de existencia
    const updatedTask = await this.tasksRepository.update(id, {
      description: updateTaskDto.descriptionTask,
      completed: updateTaskDto.completedTask,
    });
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