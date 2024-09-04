import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor, TimeoutInterceptor } from './shared/interceptors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor())
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
