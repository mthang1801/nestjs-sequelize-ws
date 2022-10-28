import { configService } from 'src/configs/configService';

export const Auth = Object.freeze({
	AUTH_TOKEN_EXPIRED_AT: 3 * 3600 * 1000, //3 hours
	AUTH_USER_ID_POSITION: 3,
	AUTH_USER_ROLE_ID_POSITION: 4,
	AUTH_SELLER_ID_POSITION: 2
});

export const RoleFunct = Object.freeze({
	SYSTEM_ADMIN_ROLE_ID: 1,
	SYSTEM_ADMIN_ROLE_NAME: 'System Admin'
});

export const WinstonColors = Object.freeze({
	info: '\x1b[36m',
	error: '\x1b[31m',
	warn: '\x1b[33m',
	verbose: '\x1b[43m'
});

export const GetInternalUrl = Object.freeze({
	API_URL: configService.getValue('API_URL'),
	WEBSITE_URL: configService.getValue('WEBSITE_URL')
});

export const DateTimeManagement = Object.freeze({
	TOKEN_EXPIRED_IN: 3 * 60 * 60 * 1000
});

export const HttpMessageResponseByStatusCode = Object.freeze({
	'200': 'Thành công',
	'201': 'Tạo thành công',
	'400': 'Lỗi request với tham số không hợp lệ',
	'404': 'Không tìm thấy',
	'500': 'Lỗi hệ thống',
	'502': 'Thời gian request quá lâu.'
});

export const sequelizeProvider = 'SEQUELIZE';

export const platformsList = [
	{
		id: 1,
		platform_name: 'Haravan',
		platform_code: 'haravan'
	},
	{
		id: 2,
		platform_name: 'Lazada',
		platform_code: 'lazada'
	},
	{
		id: 3,
		platform_name: 'Tiki',
		platform_code: 'tiki'
	},
	{
		id: 4,
		platform_name: 'Shopee',
		platform_code: 'shopee'
	},
	{
		id: 5,
		platform_name: 'KiotViet',
		platform_code: 'kiotviet'
	},
	{
		id: 6,
		platform_name: 'Yes24h',
		platform_code: 'yes24h'
	},
	{
		id: 7,
		platform_name: 'Sendo',
		platform_code: 'Sendo'
	},
	{
		id: 8,
		platform_name: 'Website',
		platform_code: 'website'
	},
	{
		id: 9,
		platform_name: 'POS',
		platform_code: 'pos'
	}
];

export const defineShippingUnits = {
	NTL: {
		id: 1,
		shippingName: 'Nhất Tín Logistics',
		keys: ['username', 'password'],
		api: {
			signIn: `${
				configService.ConnectShippingUnit().NTL.api
			}v1/auth/sign-in`,
			calcFee: `${
				configService.ConnectShippingUnit().NTL.api
			}v1/bill/calc-fee`,
			createBillShipping: `${
				configService.ConnectShippingUnit().NTL.api
			}v1/bill/create`
		}
	},
	NTX: {
		id: 2,
		shippingName: 'Nhất Tín Express',
		keys: ['username', 'password']
	},
	SPX: {
		id: 3,
		shippingName: 'Shopee Expresss',
		keys: ['username', 'password']
	}
};
