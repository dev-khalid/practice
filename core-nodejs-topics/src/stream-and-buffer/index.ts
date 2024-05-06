import fs from "fs";
import path from "path";
import http from "http";

const t2 = path.resolve("../../assets/test2.txt");
const t = path.resolve("../../assets/test.txt");

http.createServer((req, res) => {
    // const ourReadStream = fs.createReadStream(
    //     path.resolve("../../assets/test.txt")
    // );
    // const writeStream = fs.createWriteStream(
    //     path.resolve("../../assets/output.txt")
    // );

    // ourReadStream.pipe(writeStream);
    // let output = fs.readFileSync(path.resolve("../../assets/test.txt"));
    // res.write(output);
    // ourReadStream.pipe(res);
    /**
     * ourReadStream.on('data', (data) => res.write(data));
     * ourReadStream.on('end', () => res.end())
     */
    // res.end();

    /**
     * let body = [];
     * req.on('data', (chunk) => body.push(chunk));
     * req.on('end', () => Buffer.concat(body).toString());
     */
    res.write(fs.readFileSync(t));
    res.end();
    // fs.createReadStream(t).pipe(res);
}).listen(5000, () => {
    console.log("server listening on port 5000");
});

// const tStream = fs.createReadStream(t);
// const t2Stream = fs.createReadStream(t2, "utf8");

// t2Stream.on("data", (data) => {
//     console.log(data);
// });
// t2Stream.on("error", (e) => {
//     console.log(e);
// });
