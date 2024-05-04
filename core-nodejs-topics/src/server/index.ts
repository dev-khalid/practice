import { createServer } from "node:http";

const server = createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.write("Welcome to homepage!");
      res.end();
      break;
    case "/api":
      res.write(
        JSON.stringify({
          message: "Backend Server V1.1.13",
          status: "Success",
        })
      );
      res.end();
      break;
    default:
      res.write("Wrong route");
      res.end();
      break;
  }
});

server.listen(5000, () => {
  console.log("Connection established!");
});
server.on("request", () => {
  console.log("Hitting server...");
});
server.on("close", () => {
  console.log("Closing connection!");
});
