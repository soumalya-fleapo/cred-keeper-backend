import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as models from './models';
import { User, UserProfile, UserProfilesSchema, UsersSchema } from './schemas';

const modelsConfig = MongooseModule.forFeature([
  { name: User.name, schema: UsersSchema },
  { name: UserProfile.name, schema: UserProfilesSchema },
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
