import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';
import { AppModule } from './modules/app.module';
import { ListeningConnectedDatabase } from './configs/db';
import { ApplyGlobal } from './configs/global';
import { WinstonLogger } from './configs/logger';
import { ApplySwagger } from './configs/swagger';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonLogger,
  });

  // apply all services Pipes, interceptors, template engine...
  ApplyGlobal(app);

  // apply swagger service
  ApplySwagger(app);

  await ListeningConnectedDatabase(app);
}
bootstrap();
