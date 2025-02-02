import { validate } from '@app/env-config/validator';
import { DatabaseModule } from '@data/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    DatabaseModule,
    UsersModule,
    UserProfilesModule,
  ],
})
export class AppModule {}
