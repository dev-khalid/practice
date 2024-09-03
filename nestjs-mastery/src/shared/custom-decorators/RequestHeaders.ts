import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const RequestHeaders = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return data ? req.headers[data] : req.headers;
})