import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Nueva descripción de la tarea', example: 'Tarea modificada' })
  @IsString()
  @IsOptional()
  descriptionTask?: string;

  @ApiPropertyOptional({ description: 'Nuevo estado de la tarea', example: true })
  @IsBoolean()
  @IsOptional()
  completedTask?: boolean;
}