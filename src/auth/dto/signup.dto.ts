import { IsEmail, MinLength } from 'class-validator';
import { LoginOutput } from './login.dto';

export class SignupInput {
  @IsEmail()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class SignupOutput extends LoginOutput {}
