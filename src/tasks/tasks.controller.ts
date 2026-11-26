import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth() // Indica a Swagger que el controlador requiere el token JWT
@UseGuards(JwtAuthGuard) // Protege todas las rutas de este controlador
@Controller('tasks')
export class TasksController {
  constructor(private ts: TasksService) {}

  @Get()
  async getAllTasks(@Request() req: any): Promise<TaskResponseDto[]> {
    const userId = req.user.userId; // Obtenido automáticamente del token JWT
    return this.ts.getAllTasks(userId);
  }

  @Post()
  async createOneTask(
    @Request() req: any,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const userId = req.user.userId; // Extraído del payload del token por JwtStrategy
    return this.ts.createOneTask(createTaskDto, userId);
  }

  @Get(':id')
  async getOneTask(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<TaskResponseDto> {
    return this.ts.getOneTask(id, req.user.userId);
  }

  @Patch(':id')
  async updateOneTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ): Promise<TaskResponseDto> {
    return this.ts.updateOneTask(id, updateTaskDto, req.user.userId);
  }

  @Delete(':id')
  async deleteOneTask(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<TaskResponseDto> {
    return this.ts.deleteOneTask(id, req.user.userId);
  }
}