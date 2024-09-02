import { Injectable, CanActivate, ExecutionContext, All } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { AllowedSites } from './AllowedSites';

@Injectable()
export class SiteGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const sites = this.reflector.get<string[]>('AllowedSites', context.getHandler());
    // const sites = this.reflector.get(AllowedSites, context.getHandler());
    const req = context.switchToHttp().getRequest();
    const host = req.headers['host'];
    return sites?.some((site) => site.includes(host) || host.includes(site));
  }
}
