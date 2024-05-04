/**
 * On browser there are browser apis - window , dom etc that has list of function and methods like setTimeout , setInterval etc .
 * Nodejs has this useful function and methods on it's global object.
 */

import { fileURLToPath, pathToFileURL } from "url";
import path, { dirname } from "path";

function getArgValByKey(key: string) {
  return process.argv.find((item) => item.includes(key))?.split("=")[1];
}
setTimeout(() => {
  console.log(`Welcome ${getArgValByKey("name") || "Sir/Madam."}`);
}, 1000);

// console.log(process.cwd());
//console.log(module, exports)
// (global as any).name = "khalid"
// console.log(global)

// const _dirname = path.resolve('');
// console.log(_dirname, path.dirname(""));
// console.log(process.cwd(), process.env.PWD);
