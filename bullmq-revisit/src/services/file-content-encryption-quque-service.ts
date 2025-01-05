import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";

import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import FileContentCryptoService from "./file-content-crypto-service";
export interface IFileContentEncDec {
  type: "ENC" | "DEC";
  inputFilePath: string;
  outputFilePath: string;
}
class FileContentEncQueueService {
  private queueName: string = "file-content-encryption-queue";
  // private jobName: string = ["ENC", "DEC"];
  private connection;
  private queue;
  private worker;
  public serverAdapter;
  private processor;
  constructor() {
    this.processor = new FileContentCryptoService();
    this.connection = new IORedis({
      port: 6379,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASS,
      maxRetriesPerRequest: null,
    });

    this.queue = new Queue(this.queueName);

    this.worker = new Worker(
      this.queueName,
      async (job: Job<IFileContentEncDec>) => {
        return job?.data?.type == "DEC"
          ? await this.processor.decryptVideo(
              job.data.inputFilePath,
              job.data.outputFilePath
            )
          : await this.processor.encryptVideo(
              job.data.inputFilePath,
              job.data.outputFilePath
            );
      },
      {
        connection: this.connection,
        removeOnComplete: {
          age: 24 * 3600, // keep up to 1 hour
        },
        removeOnFail: {
          age: 5 * 24 * 3600, // keep up to 5 Days
        },
      }
    );

    this.serverAdapter = new ExpressAdapter();
    createBullBoard({
      queues: [new BullMQAdapter(this.queue)],
      serverAdapter: this.serverAdapter,
    });
    this.serverAdapter.setBasePath(`/${this.queueName}`);
  }

  addFile(fileData: IFileContentEncDec) {
    this.queue.add(fileData.type, fileData);
  }
}

const fileContentEncQueueService = new FileContentEncQueueService();
export default fileContentEncQueueService;
