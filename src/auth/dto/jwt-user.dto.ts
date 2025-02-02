import { TokenType } from '@app/constants';
import { UserRoles } from '@data/enums';

export class JwtUser {
  jti: string;

  sub: string;

  type: TokenType;

  roles: UserRoles[];

  iat: number;
}
