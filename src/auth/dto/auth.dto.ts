import { UserRoles } from '@data/enums';
import { IsArray, IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class SignupInput extends LoginInput {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(UserRoles)
  roles: UserRoles[];
}

export class LoginOk {
  accessToken: string;
}
