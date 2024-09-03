import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AppVersion = createParamDecorator((paramsKey: string, ctx: ExecutionContext) => {
  if(!paramsKey) throw new BadRequestException('Invalid or empty app version requested.');
  const req = ctx.switchToHttp().getRequest();
  console.log()
  return req.params[paramsKey]
})