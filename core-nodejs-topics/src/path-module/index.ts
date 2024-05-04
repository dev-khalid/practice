import path from "node:path";

let filePath =
  "/home/akash/work/practice/core-nodejs-topics/src/path-module/index.ts";
let obj: {
  [key: string]: any;
} = {
  currentDirectory: path.dirname(""),
};

obj["absoluteDirectory"] = path.resolve(obj.currentDirectory);

obj["parsedFile"] = path.parse(filePath);

obj['fileExt'] = path.extname(filePath);
console.log(obj);
