import express from "express";
import httpServer from "node:http";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const server = httpServer.createServer(app);

let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
