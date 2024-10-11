import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/dbconfig';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
