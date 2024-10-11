import { Injectable } from '@nestjs/common';
import { Logs } from './logs.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LogsService {
  constructor(private datasource: DataSource) {
    const logsRepo = this.datasource.getRepository(Logs);
    for (let i = 1; i <= 500; i++) {
      const logs = [];
      let j = 2000;
      while (j--) {
        logs.push({
          companyId: i,
          ticketId: i,
          title: `Ticket #${i}`,
          timestamp: new Date(),
          correlationId: Math.random().toString(36).substr(2, 9),
        });
      }
      (async () => {
        try {
          console.time(`Ticket #${i + j}`);
          console.log('Insert operation in progress');
          await logsRepo.insert(logs);
          console.log('Insert completed for: ', i);
        } catch (error) {
          console.log(error);
        } finally {
          console.timeEnd(`Ticket #${i + j}`);
        }
      })();
    }
  }
}
