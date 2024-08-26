import { Injectable } from '@nestjs/common';
import { Response } from 'express';

function RequestValidator() {
  //This is decorator factory
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // We can modify the descriptor here
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args?.[0]?.params) {
        let log = args?.[0]?.params?.join(' ');
        //run and store the result!
        let result = originalMethod.apply(this, args);
        return result;
      }
    };
    return descriptor;
  };
}
function deprecatedMethod() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(
        `${key} is deprecated and will be removed in a future release!`
      );
      return originalMethod.apply(this, args);
    };
  };
}

function optionalDelay(seconds: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      console.log(`Delaying ${seconds} seconds before executing ${key}`);
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      return originalMethod.apply(this, args);
    };
  };
}



@Injectable()
export class AppService {
  private appServiceVersion: string = 'v1';
  @RequestValidator()
  getHello(input?: { params?: string[] }): string {
    return input?.params?.join(' ') ?? 'Hello World!';
  }

  @deprecatedMethod()
  @optionalDelay(5)
  healthCheck(res: Response) {
    return res.json(this.getHello({ params: ['Hello', 'Khalid'] }));
    // return res.json({ status: 'UP' });
  }
}
