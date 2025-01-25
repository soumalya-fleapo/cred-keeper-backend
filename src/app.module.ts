import { validate } from '@app/env-config/validator';
import { DatabaseModule } from '@data/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ validate, isGlobal: true }), DatabaseModule],
})
export class AppModule {}
