import express, { NextFunction, Request, Response } from "express";
import http from "node:http";
import { queue } from "./config/bull-config";

import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
const serverAdapter = new ExpressAdapter();
const bullBoard = createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/admin");

const app = express();

app.use("/admin", serverAdapter.getRouter());

app.get("/add-email", (req, res) => {
  queue.add("email", {
    email: "khalid@grype.ca",
  });
  res.json("done");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  next();
});
http.createServer(app).listen(5000, () => {
  console.log("Server running on port 5000");
});
