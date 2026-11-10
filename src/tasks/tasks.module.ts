import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { UsersModule } from '../users/users.module'; // Importamos el módulo de usuarios

@Module({
  imports: [UsersModule], // Lo añadimos al arreglo de imports
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}