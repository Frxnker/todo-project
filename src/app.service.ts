import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola desde NestJS, soy Frank';
  }

  getDespedida(): string {
  return 'Adiós desde NestJS';
  }
}