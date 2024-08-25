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
        console.log('what is the mening of this?', result);
        return result;
      }
    };
    return descriptor;
  };
}
@Injectable()
export class AppService {
  @RequestValidator()
  getHello(input?: { params?: string[] }): string {
    return input?.params?.join(' ') ?? 'Hello World!';
  }

  healthCheck(res: Response) {
    return res.json(this.getHello({ params: ['Hello', 'Khalid'] }));
  }
}
