import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// 1. Importamos Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activa la validación automática para todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      transform: true, // Transforma automáticamente los tipos según el DTO
    }),
  );

  // 2. Definimos los metadatos de la documentación
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API REST de tareas con NestJS, Prisma y MongoDB')
    .setVersion('1.0')
    .build();

  // 3. Generamos el documento OpenAPI
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // 4. Montamos la interfaz visual en la ruta '/api'
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();