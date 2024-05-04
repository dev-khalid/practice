import fs from "node:fs";
import path from "node:path";

/**
 * Tasks:
 * 1. Read / write / append / clear content / rename / delete file.
 * 2. Read list of files inside a directory
 */

//Write file
// fs.writeFile("input.txt", "Hello world!", console.log);

// //Read file
// fs.readFile("./input.txt", "utf-8", (err, data) => {
//   console.log({
//     err,
//     data: data.toString(),
//   });
// });

// //Append file
// fs.appendFile('./input.txt', " Khalid welcome to Field Nation!", console.log)

//Rename file
// fs.rename('input.txt', 'trial.txt', console.log)

//Delete file
// fs.unlink(path.resolve('./trial.txt'), console.log)

//Check if a file exists
// console.log(fs.existsSync(path.resolve("./trial.txt")));

//Clear content of a file
//fs.truncate(path.resolve("./trial.txt"), console.log);

//Remove directory
// fs.rmdir(path.resolve('./test'), console.log)

//Read files of a directory
// fs.readdir(path.resolve(""), (err, files) => {
//   console.log(err, files);
// });
