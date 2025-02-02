import { UserRoles } from '@data/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, JwtRolesGuard } from '../guards';
import { Roles } from './roles.decorator';

export function JwtAuth(roles: UserRoles[]): MethodDecorator & ClassDecorator {
  return applyDecorators(Roles(roles), UseGuards(JwtAuthGuard, JwtRolesGuard));
}
