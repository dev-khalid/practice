import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async heavyProcessor(): Promise<string> {
    return new Promise((res) => {
      setTimeout(() => {
        res('Hello khalid Hossain! Things should be working now.');
      }, 1000);
    });
  }
  async setCache(
    key: string,
    value: string | number | object | boolean,
    ttl: number = 0, // default to 0 (no expiration)
  ) {
    return await this.cacheManager.set(key, value, ttl);
  }
  async getCache(key: string) {
    return await this.cacheManager.get(key);
  }

  async delCache(key: string) {
    return await this.cacheManager.del(key);
  }
  async resetCache() {
    return await this.cacheManager.clear();
  }

  async getHello() {
    return await this.heavyProcessor();
  }
}
