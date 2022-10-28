import {
	utilities as nestWinstonModuleUtilities,
	WinstonModule
} from 'nest-winston';
import * as winston from 'winston';

export const WinstonLogger = WinstonModule.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'DD/MM/YYYY HH:mm:ss'
				}),
				winston.format.uncolorize(),
				winston.format.printf(
					(info) =>
						`${info.timestamp} ${info.level}: ${info.message}` +
						(info.splat !== undefined ? `${info.splat}` : ' ')
				),
				winston.format.json(),
				nestWinstonModuleUtilities.format.nestLike('OMS API', {
					colors: true,
					prettyPrint: true
				})
			)
		}),
		new winston.transports.File({
			filename: 'logs/_error.log',
			level: 'error',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'DD/MM/YYYY HH:mm:ss'
				}),
				winston.format.json()
			)
		}),
		new winston.transports.File({
			filename: 'logs/_warn.log',
			level: 'warn',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'DD/MM/YYYY HH:mm:ss'
				}),
				winston.format.json()
			)
		}),
		new winston.transports.File({
			filename: 'logs/_combined.log',
			format: winston.format.combine(
				winston.format.timestamp({
					format: 'DD/MM/YYYY HH:mm:ss'
				}),
				winston.format.json()
			)
		})
	]
});
