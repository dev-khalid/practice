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

@withFuel
@logFuel
class Rocket {
  public fuel: number = 0;
  addFuel(amount: number) {
    this.fuel += amount;
  }
   
}

const rocket = new Rocket();

rocket.addFuel(50);
console.log(rocket.fuel);
