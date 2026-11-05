import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Descripción de la tarea', example: 'Asistir a clase' })
  @IsString()
  @IsNotEmpty()
  descriptionTask!: string;

  @ApiProperty({ description: 'Id del usuario propietario de la tarea', example: '65c2f8e1a2b3c4d5e6f7a8b9' })
  @IsString()
  @IsNotEmpty()
  idUser!: string;

  @ApiProperty({ description: 'Estado de la tarea (si se ha completado o no)', example: false, required: false })
  @IsBoolean()
  @IsOptional()
  completedTask?: boolean = false;
}