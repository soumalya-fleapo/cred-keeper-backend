import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtUser } from './dto';
import { TokenType } from '@app/constants';

@Injectable()
export class AuthService {
  public validateToken(payload: JwtUser): JwtUser {
    if (!Object.values(TokenType).includes(payload.type)) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
