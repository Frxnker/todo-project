import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Controller('tasks')
export class TasksController {
  constructor(private ts: TasksService) {}

  @Get()
  index(): Promise<TaskResponseDto[]> {
    return this.ts.getAllTasks();
  }

  @Get(':id')
  show(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.ts.getOneTask(id);
  }

  @Post()
  async store(@Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.ts.createOneTask(createTaskDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.ts.updateOneTask(id, updateTaskDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.ts.deleteOneTask(id);
  }
}