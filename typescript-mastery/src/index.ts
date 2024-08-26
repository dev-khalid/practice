/**
 * Useful links:
 * - https://blog.logrocket.com/practical-guide-typescript-decorators/#class-decorators
 */
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
