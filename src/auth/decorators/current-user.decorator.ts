import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
  (_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user.sub;
  },
);

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
