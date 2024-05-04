import { EventEmitter } from "node:events";

// //Create event
// const Notification = new EventEmitter();

// //Listener / handler of event
// Notification.on("ping", (args) => {
//   console.log("pong", args.name);
// });

// //Emit / raid event
// Notification.emit("ping", {
//   name: "khalid",
// });

//Extend event
class Notification extends EventEmitter {
  ping(arg: { name: string }) { 
    this.emit("ping", arg);
  }
}
const notification = new Notification();

notification.on("ping", (arg) => {
  console.log("Hello ", arg.name);
});
notification.ping({name: "khalid"});
