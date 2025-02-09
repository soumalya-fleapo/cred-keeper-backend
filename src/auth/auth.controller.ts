import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginOk, SignupInput } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signup(@Body() body: SignupInput): Promise<LoginOk> {
    return this.authService.signup(body);
  }

  @Post('/login')
  public async login(@Body() body: LoginInput): Promise<LoginOk> {
    return this.authService.login(body);
  }
}
