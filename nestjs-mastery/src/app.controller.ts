import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { RequestHeaders } from './custom-decorators/RequestHeaders';
import { AllowedSites } from './custom-decorators/AllowedSites';
import { SiteGuard } from './custom-decorators/SiteGuard';
import { AllowedSitesV2 } from './custom-decorators/AllowedSitesV2';

@Controller()
// @UseGuards(SiteGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  // @AllowedSites(['localhost'])
  @AllowedSitesV2(['localhost'])
  healthCheck(@Res() res: Response, @RequestHeaders('host') requestHeaders: unknown) {
    return this.appService.healthCheck(res);
  }
}
