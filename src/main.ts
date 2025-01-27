import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.listen(Number(configService.getOrThrow('PORT')));
  return app;
}
bootstrap();
