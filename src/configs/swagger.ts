import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule
} from '@nestjs/swagger';

import { join } from 'path';
import { extraModels } from 'src/swagger/extraModels';
import { includes } from 'src/swagger/includes';
import { configService } from './configService';

export const ApplySwagger = (app) => {
	const SwaggerConfig = new DocumentBuilder()
		.setTitle(configService.SwaggerConfig().title)
		.setDescription(configService.SwaggerConfig().description)
		.setContact(
			configService.SwaggerConfig().contactName,
			configService.SwaggerConfig().contactUrl,
			configService.SwaggerConfig().contactEmail
		)
		.setVersion(configService.SwaggerConfig().version)
		.setLicense(
			configService.SwaggerConfig().licenseName,
			configService.SwaggerConfig().licenseUrl
		)
		.addTag(configService.SwaggerConfig().tag)
		.addBearerAuth()
		.build();

	const swaggerOptions: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) =>
			methodKey,
		ignoreGlobalPrefix: false,
		include: includes,
		extraModels
	};

	const document = SwaggerModule.createDocument(
		app,
		SwaggerConfig,
		swaggerOptions
	);

	SwaggerModule.setup('api/v1/docs', app, document, {
		explorer: true,
		customCssUrl: join(
			process.cwd(),
			'public',
			'swagger-ui',
			'swagger-material.css'
		)
	});
};
