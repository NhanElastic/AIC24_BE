import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  setupSwagger(app);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
