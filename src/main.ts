import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
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

  // Metadatos de la documentación
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API REST de tareas con NestJS, Prisma y MongoDB')
    .setVersion('1.0')
    .addBearerAuth() // Habilita el botón "Authorize" en Swagger
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();