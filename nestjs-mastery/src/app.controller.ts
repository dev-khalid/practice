import { Controller, Get, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { RequestHeaders } from './shared/custom-decorators/RequestHeaders';
import { AllowedSitesV2 } from './shared/custom-decorators/AllowedSitesV2';
import { AppVersion } from './shared/custom-decorators';
import { ValidateAppVersion } from './shared/pipes';
// import { SiteGuard } from './shared/custom-decorators/SiteGuard';
// import { AppVersionEnum } from './shared/types';
// import { AllowedSites } from './shared/custom-decorators/AllowedSites';
// import { LoggingInterceptor } from './shared/interceptors';

// @UseInterceptors(LoggingInterceptor)
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

  @Get('/app-info/:id')
  getAppInfoByVersion(@AppVersion('id', new ValidateAppVersion()) appVersion: string) {
    return this.appService.getAppInfoByVersion(appVersion);
  }
}
