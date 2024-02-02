import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
        "userId": req['userId'],
        "UserRole": req['userRole']? req['userRole'] : "user"
    }
})