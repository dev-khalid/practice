import express, { NextFunction, Request, Response } from "express";
import http from "node:http";
import emailQueueService from "./services/email-queue-service";
import fileContentEncQueueService from "./services/file-content-encryption-quque-service";

const app = express();
app.use(express.json());

app.use("/email-queue", emailQueueService.serverAdapter.getRouter());
app.use(
  "/file-content-encryption-queue",
  fileContentEncQueueService.serverAdapter.getRouter()
);
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

app.post("/file-crypto", (req, res, next) => {
  console.log(req.body);
  fileContentEncQueueService.addFile({
    type: req.body.type,
    inputFilePath: req.body.inputFilePath,
    outputFilePath: "./output.enc",
  });
  res.json({
    message: "File encryption/decryption request added to queue",
  });
});
// setTimeout(() => {
//   for (let i = 1; i < 5; i++) {
//     emailQueueService.addEmail(`khalid+${i}@grype.ca`, {
//       attempts: 1,
//       backoff: {
//         type: "exponential",
//         delay: 1000,
//       },
//     });
//   }
// }, 2000);

app.get("/health", (req, res) => {
  res.json({
    message: `Server running on port 5000`,
  });
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  next();
});
http.createServer(app).listen(5000, () => {
  console.log("Server running on port 5000");
});
