import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatorOptions } from 'class-validator';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Todo Api')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addTag('Todo')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    extraModels: [],
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
