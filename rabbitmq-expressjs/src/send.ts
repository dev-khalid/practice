import amqplib from "amqplib";
import brokerConnection from "./config/broker-connection.config";
const EMAIL_QUEUE = "email-queue";

(async () => {
  try {
    const queue = EMAIL_QUEUE;
    const conn = await brokerConnection();
    if (!conn) {
      return;
    }
    console.log("Connected to RabbitMQ.");
    const consumerQ = await conn.createChannel();
    await consumerQ.assertQueue(queue, {
      durable: false,
    });

    consumerQ.consume(
      queue,
      (msg) => {
        console.log(msg?.content.toString());
      },
      {
        noAck: true, //means we don't need to acknowledge by ourselves, if a task is consumed by the consumer then it will be acknowledged automatically, and removed from the queue.
      }
    );

    const producerQ = await conn.createChannel();

    setInterval(() => {
      producerQ.sendToQueue(
        queue,
        Buffer.from(
          JSON.stringify({
            email: "khalid@grype.ca",
            subject: "subject",
            body: "body",
            id: Math.floor(Math.random() * 100 + 1),
          })
        )
      );
    }, 3000);
  } catch (error) {
    console.log(error);
  }
})();
