import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphql } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.info(`Server is running on: ${await app.getUrl()}/graphql`)
}
bootstrap();
