import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";

// export const queue = new Queue("email-sender");
// const worker = new Worker(
//   "email-sender",
//   async (job: Job) => {
//     // Optionally report some progress
//     await job.updateProgress(42);

//     // Optionally sending an object as progress
//     await job.updateProgress({ foo: "bar" });
//     console.log(job.data);
//     // Do something with job
//     return "some value";
//   },
//   {
//     connection,
//   }
// );
