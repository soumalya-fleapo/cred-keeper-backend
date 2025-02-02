import { UserRoles } from '@data/enums';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (roles: UserRoles[]): CustomDecorator<string> => {
  return SetMetadata(ROLES_KEY, roles);
};
