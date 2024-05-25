/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const corsConfig: any = {
  //   origin: 'http://localhost:3000', // Replace with your frontend origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // Allow cookies for authentication (optional)
  // };
  // app.enableCors(corsConfig);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
