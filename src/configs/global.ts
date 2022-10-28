import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as compression from 'compression';
import 'dotenv/config';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

import { configService } from './configService';

import { viewEngineConfig } from './viewEngine.config';

export const ApplyGlobal = (app) => {
	
  app.useGlobalPipes(new ValidationPipe(configService.ValidationConfig()));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(require('helmet')());

  app.use(compression());

  viewEngineConfig(app);

  app.setGlobalPrefix(configService.getValue('GLOBAL_PREFIX'), {
    exclude: configService.AppConfig().exludeGlobalPrefix,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.AppConfig().enableVersioning,
  });

  app.enableShutdownHooks();

  app.enableCors();
};
