import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, LoginOutput, SignupInput, SignupOutput } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signup(@Body() body: SignupInput): Promise<SignupOutput> {
    return this.authService.signup(body);
  }

  @Post('/login')
  public async login(@Body() body: LoginInput): Promise<LoginOutput> {
    return this.authService.login(body);
  }
}
