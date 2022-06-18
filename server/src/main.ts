// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${__dirname}/../.env.${process.env.NODE_ENV}`,
});

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Stocks API')
    .setDescription('The Stocks API description')
    .setVersion('1.0')
    .addTag('stocks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
