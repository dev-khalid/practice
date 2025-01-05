import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import crypto from "crypto";

class FileContentCryptoService {
  private IV = crypto.randomBytes(16);
  constructor() {}
  encryptVideo(inputPath: string, outputPath: string) {
    return new Promise((resolve, reject) => {
      const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        process.env.VIDEO_ENCRYPTION_KEY as string,
        this.IV
      );

      const inputStream = createReadStream(inputPath);
      const outputStream = createWriteStream(outputPath);

      pipeline(inputStream, cipher, outputStream, (err) => {
        if (err) {
          return reject(err);
        }
        resolve({
          message: "File content encrypted",
          outputPath,
        });
      });
    });
  }
  decryptVideo(
    inputPath: string,
    outputPath: string
  ): Promise<{ message: string; outputPath: string }> {
    return new Promise((resolve, reject) => {
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        process.env.VIDEO_ENCRYPTION_KEY as string,
        this.IV
      );

      const inputStream = createReadStream(inputPath);
      const outputStream = createWriteStream(outputPath);

      pipeline(inputStream, decipher, outputStream, (err) => {
        if (err) {
          return reject(err);
        }
        resolve({
          message: "File content decrypted",
          outputPath,
        });
      });
    });
  }
}

export default FileContentCryptoService;