import { SALT_ROUNDS, TokenType } from '@app/constants';
import { UsersService } from '@app/users/users.service';
import { UserRoles } from '@data/enums';
import { UsersModel } from '@data/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import {
  JwtUser,
  LoginInput,
  LoginOutput,
  SignupInput,
  SignupOutput,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersModel: UsersModel,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(input: SignupInput): Promise<SignupOutput> {
    const password = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await this.usersService.createUser({ ...input, password });
    await this.usersService.createUserProfile({
      user: user._id,
      name: input.name,
    });

    return {
      accessToken: this.createJwt({
        sub: user._id,
        roles: user.roles,
        type: TokenType.ACCESS_TOKEN,
      }),
    };
  }

  public async login(input: LoginInput): Promise<LoginOutput> {
    const user = await this.usersModel.findByEmail(input.email);

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      accessToken: this.createJwt({
        sub: user._id,
        roles: user.roles,
        type: TokenType.ACCESS_TOKEN,
      }),
    };
  }

  public validateToken(payload: JwtUser): JwtUser {
    if (!Object.values(TokenType).includes(payload.type)) {
      throw new UnauthorizedException();
    }
    return payload;
  }

  private createJwt(input: {
    type: TokenType;
    roles: UserRoles[];
    sub: Types.ObjectId;
  }): string {
    const expiresInMap = {
      [TokenType.ACCESS_TOKEN]: '30d',
    };

    return this.jwtService.sign(
      { ...input, jti: new Types.ObjectId() },
      { expiresIn: expiresInMap[input.type] },
    );
  }
}
