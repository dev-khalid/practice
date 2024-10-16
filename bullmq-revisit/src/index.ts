import express, { NextFunction, Request, Response } from "express";
import http from "node:http";
import emailQueueService from "./services/email-queue-service";

const app = express();

app.use("/email-queue", emailQueueService.serverAdapter.getRouter());

app.get("/add-email/:email", (req, res) => {
  emailQueueService.addEmail(req?.params?.email, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });

  res.json(req?.params?.email);
});
setTimeout(() => {
  for (let i = 1; i < 5; i++) {
    emailQueueService.addEmail(`khalid+${i}@grype.ca`, {
      attempts: 1,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });
  }
}, 2000);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  next();
});
http.createServer(app).listen(5000, () => {
  console.log("Server running on port 5000");
});
