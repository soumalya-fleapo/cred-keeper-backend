import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
