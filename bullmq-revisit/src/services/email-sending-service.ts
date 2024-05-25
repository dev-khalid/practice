import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export class EmailSendingService {
  private readonly transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async mimicSendingEmail(email: string) {
    let randomTime = Math.round(Math.random() * 10000 + 4000);
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomTime > 5000) {
          reject(
            `Took ${randomTime / 1000} seconds resulting in request timeout!`
          );
        } else {
          resolve(`Send email to ${email} within ${randomTime / 1000} seconds`);
        }
      }, randomTime);
    });
  }

  async sendEmail(email: string) {
    this.transporter
      .sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email using Node.js",
        text: "Hello world!",
      })
      .then(console.log)
      .catch(console.log);
  }
}

const emailSendingService = new EmailSendingService();
export default emailSendingService;
