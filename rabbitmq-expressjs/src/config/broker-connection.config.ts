import amqplib from "amqplib";
async function brokerConnection() {
  let connection;
  try {
    connection = await amqplib.connect("amqp://localhost");
  } catch (error) {
    console.log("Error connecting to rabbitMQ server.", error);
    connection = null;
  }
  return connection;
}

export default brokerConnection;
