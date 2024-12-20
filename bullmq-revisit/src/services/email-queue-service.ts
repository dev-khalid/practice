import { Queue, Worker, Job, JobsOptions, QueueEvents } from "bullmq";
import IORedis from "ioredis";
import emailSendingService from "./email-sending-service";

import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";

class EmailQueueService {
  private queueName: string = "email-queue";
  private taskNames: string[] = ["email"];
  private connection;
  private readonly queue;
  private readonly worker;
  private readonly queueEvents;
  public readonly serverAdapter;
  constructor() {
    this.connection = new IORedis({
      maxRetriesPerRequest: null,
    });

    this.queue = new Queue(this.queueName, {
      connection: this.connection,
    });

    this.worker = new Worker(
      this.queueName,
      async (job: Job<{ email: string }>) => {
        // return await emailSendingService.mimicSendingEmail(job.data.email);
        return await emailSendingService.sendEmail(job.data.email);
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
    this.queueEvents = new QueueEvents(this.queueName);

    this.queueEvents.on("completed", (job, result) => {
      console.log("Completed: ", job, result);
    });
    this.queueEvents.on("failed", (job, error) => {
      console.log("Failed: ", job, error);
    });
    
    this.serverAdapter = new ExpressAdapter();
    const bullBoard = createBullBoard({
      queues: [new BullMQAdapter(this.queue)],
      serverAdapter: this.serverAdapter,
    });
    this.serverAdapter.setBasePath("/email-queue");
  }

  addEmail(email: string, optionalConfig?: JobsOptions) {
    this.queue.add(
      this.taskNames[0],
      {
        email,
      },
      optionalConfig
    );
  }
}

const emailQueueService = new EmailQueueService();

//Exporting singleton instance.
export default emailQueueService;
