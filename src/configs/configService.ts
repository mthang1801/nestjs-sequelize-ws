import { HttpStatus, RequestMethod } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import 'dotenv/config';
import * as fs from 'fs';
import { RedisModuleOptions } from 'nestjs-redis';
interface IJWTConfig {
	secret: string;
	expire: number;
}

interface IMailTransportConfig {
	host: string;
	port: number;
	auth: {
		user: string;
		pass: string;
	};
	secure: boolean;
	tls: {
		rejectUnauthorized: boolean;
	};
	debug?: boolean;
}

interface IUploadConfig {
	cdnUrl: string;
	cdnSecurityUploadUrl: string;
	uploadAPI: string;
}

interface IRabbitMQConfig {
	rabbitHost: string;
	rabbitPort: number;
	rabbitUser: string;
	rabbitPass: string;
}

interface IElasticsearchConfig {
	searchNode: string;
	searchUser: string;
	searchPass: string;
}
interface IDatabaseCconfig {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}
interface DatabaseConfig {
	master: IDatabaseCconfig;
	slave: IDatabaseCconfig;
	logging?: boolean;
}

interface URLConfig {
	website: string;
	api: string;
}

export const envKeys: string[] = [
	'MYSQL_MASTER_HOST',
	'MYSQL_MASTER_USERNAME',
	'MYSQL_MASTER_PASSWORD',
	'MYSQL_MASTER_DATABASE',
	'MYSQL_MASTER_PORT',
	'MYSQL_SLAVE_HOST',
	'MYSQL_SLAVE_USERNAME',
	'MYSQL_SLAVE_PASSWORD',
	'MYSQL_SLAVE_DATABASE',
	'MYSQL_SLAVE_PORT',
	'PORT',
	'JWT_SECRET_KEY',
	'JWT_EXPIRES_IN',
	'REDIS_HOST',
	'REDIS_PORT',
	'REDIS_PASS',
	'REDIS_TTL',
	'EMAIL_HOST',
	'EMAIL_PORT',
	'EMAIL_USER',
	'EMAIL_PASS',
	'SECURITY_KEY',
	'INIT_VECTOR',
	'SELLER_ADMIN_UUID',
	'NT_ADMIN_UUID',
	'REDIS_HOST',
	'REDIS_PORT',
	'CDN_URL',
	'CDN_UPLOAD_URL',
	'CDN_UPLOAD_AUTH_UUID',
	'GLOBAL_PREFIX',
	'WEBSITE_URL',
	'API_URL',
	'WHITE_LIST_CORS',
	'ELASTICSEARCH_NODE',
	'ELASTICSEARCH_USERNAME',
	'ELASTICSEARCH_PASSWORD',
	'NTL_PARTNER_ID',
	'API_NTL',
	'UTM_SOURCE_NTL'
];
class ConfigService {
	constructor(private readonly env: { [key: string]: string | undefined }) {}

	getValue(key: string, throwOnMissing = false) {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`read config error - missing env.${key}`);
		}
		return value;
	}

	getValues(keys: string[]) {
		keys.forEach((key) => this.getValue(key, true));
		return this;
	}

	private getFile(key: string) {
		const fullPath = this.getValue(key);
		if (!fs.existsSync(fullPath)) {
			throw new Error(
				`read config error - key: ${key}, value: ${fullPath} is not existed`
			);
		}
	}

	getFiles(keys: string[]) {
		keys.forEach((key) => this.getFile(key));
		return this;
	}

	DatabaseConfig(): DatabaseConfig {
		const master = {
			host: this.getValue('MYSQL_MASTER_HOST'),
			port: parseInt(this.getValue('MYSQL_MASTER_PORT')),
			username: this.getValue('MYSQL_MASTER_USERNAME'),
			password: this.getValue('MYSQL_MASTER_PASSWORD'),
			database: this.getValue('MYSQL_MASTER_DATABASE')
		};

		const slave = {
			host: this.getValue('MYSQL_SLAVE_HOST'),
			port: parseInt(this.getValue('MYSQL_SLAVE_PORT')),
			username: this.getValue('MYSQL_SLAVE_USERNAME'),
			password: this.getValue('MYSQL_SLAVE_PASSWORD'),
			database: this.getValue('MYSQL_SLAVE_DATABASE')
		};

		return {
			master,
			slave,
			logging: this.getValue('NODE_ENV') === 'development'
		};
	}

	JwtConfig(): IJWTConfig {
		return {
			secret: this.getValue('JWT_SECRET_KEY'),
			expire: parseInt(this.getValue('JWT_EXPIRES_IN'))
		};
	}

	RedisConfig(): RedisModuleOptions {
		return {
			host: this.getValue('REDIS_HOST'),
			port: parseInt(this.getValue('REDIS_PORT')),
			password: this.getValue('REDIS_PASS'),
			db: 5,
			keyPrefix: '[OMS]'
		};
	}

	MailTransportConfig(): IMailTransportConfig {
		const mailTransportConfig: IMailTransportConfig = {
			host: this.getValue('EMAIL_HOST'),
			secure: true,
			port: parseInt(this.getValue('EMAIL_PORT')),
			auth: {
				user: this.getValue('EMAIL_USER'),
				pass: this.getValue('EMAIL_PASS')
			},
			tls: { rejectUnauthorized: false },
			debug: true
		};

		return mailTransportConfig;
	}

	ValidationConfig(): ValidatorOptions | Record<string, any> {
		return {
			transform: true,
			whitelist: true,
			errorHttpStatusCode: HttpStatus.BAD_REQUEST,
			forbidNonWhitelisted: false,
			disableErrorMessages: false,
			skipMissingProperties: false
		};
	}

	AppConfig() {
		return {
			port: parseInt(this.getValue('PORT'), 10),
			bcryptSalt: parseInt(this.getValue('BCRYPT_SALT'), 10),
			apiPrefix: this.getValue('GLOBAL_PREFIX') || 'api',
			exludeGlobalPrefix: [
				{ path: 'uploads', method: RequestMethod.ALL },
				{ path: '/', method: RequestMethod.GET }
			],
			whiteListCORS: this.getValue('WHITE_LIST_CORS').split(','),
			enableVersioning: ['1']
		};
	}

	SwaggerConfig() {
		return {
			title: 'OMS Service Builder',
			description: 'OMS Service Description',
			contactName: 'NestJS Example API',
			contactUrl: 'https://mvt-blog.com/',
			contactEmail: 'mthang1801@gmail.com',
			version: '1.0',
			tag: 'Nội dung',
			licenseName: '',
			licenseUrl: 'localhost',
			serverURl: this.getValue('API_URL')
		};
	}

	RabbitMQ(): IRabbitMQConfig {
		return {
			rabbitHost: this.getValue('RABBIT_HOST'),
			rabbitPort: parseInt(this.getValue('RABBIT_PORT')),
			rabbitUser: this.getValue('RABBIT_USER'),
			rabbitPass: this.getValue('RABBIT_PASS')
		};
	}

	PlatformConfig() {
		return {
			SHOPEE: {
				host: 'https://partner.shopeemobile.com',
				token: {
					refresh_token: '574a6a4e556b4459534f456e5a634d45',
					access_token: '64674868704d7a71514959646e4e5a69',
					expire_in: 14338.0,
					token_createdDate: 1649393496,
					partner_id: 2003584,
					partner_key:
						'68c43e5943521b0a869feab0fe8ad2c7d3ac550681b2937fab652c0e60d9ddd8',
					shop_id: 175352313,
					Merchant_id: 0,
					authorized_code: '4245765675416d666c6e737642715368',
					request_id: '3488d570eff202e7f49b082106ac9fc2',
					message: '',
					error: '',
					warning: null
				},
				orders: {
					getList: {
						apiPath: '/api/v2/order/get_order_list',
						method: 'GET'
					}
				}
			},
			TIKI: {},
			LAZADA: {},
			HARAVAN: {}
		};
	}

	UploadConfig(): IUploadConfig {
		return {
			cdnUrl: this.getValue('CDN_URL'),
			cdnSecurityUploadUrl: this.getValue('CDN_UPLOAD_AUTH_UUID'),
			uploadAPI: this.getValue('CDN_UPLOAD_URL')
		};
	}

	ElasticSearchConfig(): IElasticsearchConfig {
		return {
			searchNode: this.getValue('ELASTICSEARCH_NODE'),
			searchUser: this.getValue('ELASTICSEARCH_USERNAME'),
			searchPass: this.getValue('ELASTICSEARCH_PASSWORD')
		};
	}

	URLConfig() {
		return {
			website: this.getValue('WEBSITE_URL'),
			api: this.getValue('API_URL')
		};
	}

	UserAuthentication() {
		//Do not set position over 5
		return {
			SELLER_ADMIN_UUID: this.getValue('SELLER_ADMIN_UUID'),
			NT_ADMIN_UUID: this.getValue('NT_ADMIN_UUID'),
			AUTH_USER_ID_POSITION: 1,
			AUTH_USER_ROLE_CODE_POSITION: 2,
			AUTH_USER_ROLE_ID_POSITION: 3,
			AUTH_USER_SELLER_ID_POSITION: 4
		};
	}

	ConnectShippingUnit() {
		return {
			NTL: {
				partner_id: parseInt(this.getValue('NTL_PARTNER_ID')),
				api: this.getValue('API_NTL'),
				utm_source: this.getValue('UTM_SOURCE_NTL')
			}
		};
	}
}

export const configService = new ConfigService(process.env).getValues(envKeys);
