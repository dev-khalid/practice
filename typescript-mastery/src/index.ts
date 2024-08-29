/**
 * Useful links:
 * - https://blog.logrocket.com/practical-guide-typescript-decorators/#class-decorators
 * - https://blog.bitsrc.io/typescripts-reflect-metadata-what-it-is-and-how-to-use-it-fb7b19cfc7e2
 */
import "reflect-metadata";

function withFuel(target: typeof Rocket, context: ClassDecoratorContext) {
  if (context.kind == "class") {
    return class extends target {
      fuel: number = 50;
      isEmpty(): boolean {
        return this.fuel == 0;
      }
    };
  }
}
function logFuel(target: Function, context: ClassDecoratorContext) {
  const originalMethod = target.prototype.addFuel;
  target.prototype.addFuel = function (...args: any[]) {
    console.log(`Before adding fuel, total fuel: ${this.fuel}`);
    originalMethod.call(this, args?.[0]);
    console.log(`After adding fuel, total fuel: ${this.fuel}`);
  };
}

function deprecatedMethod(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  if (context.kind == "method") {
    console.warn(
      `${String(
        context.name
      )} is deprecated and will be removed in a future release!`
    );
    // return target.apply(this, arguments);
  }
}
function deprecatedProperty(_: any, context: ClassFieldDecoratorContext) {
  if (context.kind == "field") {
    return function (initialValue: any) {
      console.warn(
        `Property ${String(
          context.name
        )} is deprecated and will be removed in a future release!`
      );
      return initialValue;
    };
  }
}
@withFuel
@logFuel
class Rocket {
  public fuel: number = 0;

  @deprecatedProperty
  public rocketName: string;

  constructor() {}
  addFuel(amount: number) {
    this.fuel += amount;
  }

  // @deprecatedMethod
  isReadyForLaunch() {
    return this.fuel > 0;
  }
}

// const rocket = new Rocket();

// rocket.addFuel(50);
// // console.log(rocket.fuel);
// console.log(rocket.isReadyForLaunch());

function Injectable() {
  return function (target: any) {
    Reflect.defineMetadata("injectable", true, target);
  };
}

@Injectable()
class MyService {
  constructor(private _dependency: MyDependency) {}

  doSomething() {
    this._dependency.doSomething();
  }
}

@Injectable()
class MyDependency {
  doSomething() {
    console.log("MyDependency is doing something");
  }
}

let x = new MyDependency(); 
x.doSomething() // worked properly!


class DependencyInjection {
  static get<T>(target: any): T {
    const isInjectable = Reflect.getMetadata("injectable", target);
    if (!isInjectable) {
      throw new Error("Target is not injectable");
    }

    const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
    const instances = dependencies.map((dep) => DependencyInjection.get(dep));
    return new target(...instances);
  }
}

const myService = DependencyInjection.get<MyService>(MyService);
// myService.doSomething(); // Didn't work but I think with some brush-up it will also work, and I like the concept!