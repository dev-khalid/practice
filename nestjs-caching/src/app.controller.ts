import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
@CacheTTL(60 * 1000)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('/welcome')
  getWelcome() {
    return `Welcome to the NestJS Caching Example!`;
  }
}
