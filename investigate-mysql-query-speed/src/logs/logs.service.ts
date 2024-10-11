import { Injectable } from '@nestjs/common';
import { Logs } from './logs.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LogsService {
  rest() {
    return new Promise((resolve, reject) => setTimeout(resolve, 30 * 1000));
  }
  constructor(private datasource: DataSource) {
    const logsRepo = this.datasource.getRepository(Logs);
    for (let k = 0; k < 3; k++) {
      for (let i = 1; i <= 500; i++) {
        // each time it generates 1M logs.
        const logs = [];
        let j = 2000;
        let companyId = Math.round(Math.random() * 10000 + 999999); //per 2000 company Id will be changed!
        while (j--) {
          let ticketId = Math.random() * 10000 + 999999;
          logs.push({
            companyId,
            ticketId,
            title: `Ticket #${ticketId}`,
            timestamp: new Date(),
            correlationId: Math.random().toString(36).substr(2, 9),
          });
        }
        (async () => {
          try {
            console.time(`${companyId}`);
            console.log('Insert operation in progress for k, i: ', k, ' ', i);
            await logsRepo.insert(logs);
            console.log('Insert completed for k, i: ', k, ' ', i);
          } catch (error) {
            console.log(error);
          } finally {
            console.timeEnd(`${companyId}`);
          }
        })();
      }

      (async () => {
        console.log('\n\nResting for 30 seconds!');
        await this.rest();
      })();
    }
  }
}
