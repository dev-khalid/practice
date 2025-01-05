import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import crypto, { randomFillSync, scryptSync } from "crypto";

class FileContentCryptoService {
  private IV = randomFillSync(new Uint8Array(16));
  private ENCRYPTION_KEY = scryptSync(
    process.env.VIDEO_ENCRYPTION_KEY || "",
    "salt",
    24
  );
  constructor() {}

  mimicPromise() {
    return new Promise((resolve, reject) => {
      let randomTime = Math.floor(Math.random() * 1000 * 60) + 1000;
      setTimeout(() => {
        if (randomTime > 30 * 1000) {
          return reject(new Error("Taking longer than 30 seconds."));
        } else {
          return resolve(
            "File encrypted/decrypted in " +
              Math.ceil(randomTime / 1000) +
              " seconds"
          );
        }
      }, randomTime);
    });
  }
  encryptVideo(inputPath: string, outputPath: string) {
    return this.mimicPromise();
    // return new Promise((resolve, reject) => {
    //   const cipher = crypto.createCipheriv(
    //     "aes-256-cbc",
    //     this.ENCRYPTION_KEY,
    //     this.IV
    //   );

    //   const inputStream = createReadStream(inputPath);
    //   const outputStream = createWriteStream(outputPath);

    //   pipeline(inputStream, cipher, outputStream, (err) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve({
    //       message: "File content encrypted",
    //       outputPath,
    //     });
    //   });
    // });
  }
  decryptVideo(inputPath: string, outputPath: string) {
    return this.mimicPromise();
    // return new Promise((resolve, reject) => {
    //   const decipher = crypto.createDecipheriv(
    //     "aes-256-cbc",
    //     this.ENCRYPTION_KEY,
    //     this.IV
    //   );

    //   const inputStream = createReadStream(inputPath);
    //   const outputStream = createWriteStream(outputPath);

    //   pipeline(inputStream, decipher, outputStream, (err) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve({
    //       message: "File content decrypted",
    //       outputPath,
    //     });
    //   });
    // });
  }
}

export default FileContentCryptoService;
