import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as models from './models';
import {
  UserProfiles,
  UserProfilesSchema,
  Users,
  UsersSchema,
} from './schemas';

const modelsConfig = MongooseModule.forFeature([
  { name: Users.name, schema: UsersSchema },
  { name: UserProfiles.name, schema: UserProfilesSchema },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('DATABASE_URI'),
      }),
    }),
    modelsConfig,
  ],
  providers: Object.values(models),
  exports: Object.values(models),
})
export class DatabaseModule {}
