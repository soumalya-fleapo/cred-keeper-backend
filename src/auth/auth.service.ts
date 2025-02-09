import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUser, LoginInput, LoginOk, SignupInput } from './dto';
import { TokenType } from '@app/constants';
import * as bcrypt from 'bcrypt';
import { UsersModel } from '@data/models';
import { UsersService } from '@app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@data/schemas';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersModel: UsersModel,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(body: SignupInput): Promise<LoginOk> {
    if (await this.usersModel.findUserByEmail(body.email)) {
      throw new HttpException(
        { message: 'Email already existed.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.createUser(body);

    await this.usersService.createUserProfile({ user, body });

    return this.createJwt(user);
  }

  public async login(body: LoginInput): Promise<LoginOk> {
    const user = await this.validateCredentials(body);

    return this.createJwt(user);
  }

  public validateToken(payload: JwtUser): JwtUser {
    if (!Object.values(TokenType).includes(payload.type)) {
      throw new UnauthorizedException();
    }

    return payload;
  }
  private async validateCredentials(body: LoginInput): Promise<User> {
    const { email, password } = body;

    const user = await this.usersModel.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  private createJwt(user: User): LoginOk {
    const payload = {
      sub: user._id.toString(),
      type: TokenType.ACCESS_TOKEN,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
