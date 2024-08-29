/**
 * Useful articles: 
 * 1. https://blog.bitsrc.io/typescripts-reflect-metadata-what-it-is-and-how-to-use-it-fb7b19cfc7e2
 */
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import 'reflect-metadata';
function RequestValidator() {
  //This is decorator factory
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // We can modify the descriptor here
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (args?.[0]?.params) {
        const log = args?.[0]?.params?.join(' ');
        //run and store the result!
        const result = originalMethod.apply(this, args);
        return result;
      }
    };
    return descriptor;
  };
}
function deprecatedMethod() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${key} is deprecated and will be removed in a future release!`);
      return originalMethod.apply(this, args);
    };
  };
}

function optionalDelay(seconds: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      console.log(`Delaying ${seconds} seconds before executing ${key}`);
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
      return originalMethod.apply(this, args);
    };
  };
}

function propertyDecorator(target: any, propertyKey: string) {
  console.log(target, propertyKey);
}

function isValidApiVersion(apiVersion: string) {
  return function (target: any, key: string) {
    return Reflect.defineMetadata(key, apiVersion, target);
  };
}

function Versioning<T = string>(metadata: T) {
  return function (target: any, key: string, descriptor: TypedPropertyDescriptor<() => string>) {
    // Target refer to the class / "this" keyword of the class.
    // Key is the name of the method / function.
    if (typeof metadata == 'string') {
      if (metadata == 'v1') {
        throw new Error('Version no longer supported! Please use V2 or above.');
      }
    } else if (typeof metadata == 'object') {
      if (metadata && (metadata as any)?.['apiVersion'] == 1) {
        throw new Error('Version no longer supported! Please use V2 or above.');
      }
    }
    Reflect.defineMetadata('Version', metadata, target, key);
  };
}

/**
 * Purpose: Set the roles to the method, in future we can use this to validate if user has permission to access the method.
 */
function Roles(roles: string[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    Reflect.defineMetadata('roles', roles, target, key);

    descriptor.value = function (...args: any[]) {
      // As I have already mentioned in useRolesGuard nestjs has access to req/res so we can check if the user has the role that is defined in the roles metadata, if not then from here we can throw error.

      // If match
      return originalMethod.apply(this, args);
    };
  };
  //By following above idea we can check it in one step! Like this: 
  /**
   * @Roles (['Admin', 'Developer'])
   * checkPassword()
   */
  // And by using useRolesGuard() we had to do this. 
  /**
   * @Roles (['Admin', 'Developer'])
   * @useRolesGuard ()
   * checkPassword()
   */
}

function useRolesGuard() {
  //In nestjs we will have access to req,res,next object, and I know that this is coming from that @Injectable decorator, otherwise it couldn't find that.
  // So from req.user.role we can grab the role and from "roles" metadata we can get defined roles for the method and decide the access permission.
}

@Injectable()
export class AppService {
  @isValidApiVersion('1.0')
  private appServiceVersion = 'v1';

  constructor() {
    // console.log(Reflect.getMetadata('Version', AppService.prototype, this.myMethod.name)); // output: {apiVersion: 1}
    // console.log(Object.keys(this)) // output: appServiceVersion
  }
  @Versioning({ apiVersion: 2 })
  myMethod() {
    return 'Hello!';
  }

  @RequestValidator()
  getHello(input?: { params?: string[] }): string {
    return input?.params?.join(' ') ?? 'Hello World!';
  }

  @deprecatedMethod()
  // @optionalDelay(5)
  healthCheck(res: Response) {
    console.log(Reflect.getMetadata('my-decorator', AppService.prototype, 'myMethod'));
    return res.json(this.getHello({ params: ['Hello', 'Khalid'] }));
    // return res.json({ status: 'UP' });
  }
}
