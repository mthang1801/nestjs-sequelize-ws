import * as crypto from 'crypto';
import * as moment from 'moment';
import ShortUniqueId from 'short-unique-id';
import { v4 as uuid } from 'uuid';

export function genRandomString(length = 36): string {
	return crypto
		.randomBytes(Math.ceil(+length / 2))
		.toString('hex')
		.slice(0, length);
}

export const getPageOffsetLimit = (params: any) => {
	let { page, limit } = params;
	page = +page || 1;
	limit = +Math.min(limit || 10, 100);
	const offset = (page - 1) * limit;
	return { page, offset, limit };
};

export const preprocessUserResult = (user) => {
	if (!user) return null;
	if (typeof user == 'object' && Array.isArray(user)) {
		const users = [];
		user.forEach((item) => {
			const userObject = { ...item };
			// delete userObject.password;
			delete userObject.salt;
			users.push(userObject);
		});
		return users;
	}
	const userObject = { ...user };
	delete userObject.password;
	delete userObject.salt;
	return userObject;
};

export const generateOTPDigits = () =>
	Math.floor(100000 + Math.random() * 900000);

export const generateRandomNumber = (length) => {
	let result = '';
	if (length < 0) {
		return result;
	}
	for (let i = 0; i < length; i++) {
		let value = Math.random() * 10;

		if (value < 1) {
			value = 0;
		} else if (value > 9) {
			value = 9;
		} else {
			value = Math.ceil(value);
		}
		result += value.toString();
	}
	return result;
};

export const generateRandomString = (length = 32) =>
	uuid().replace(/-/g, '').slice(0, length);

export const generateRandomPassword = (length = 10) => {
	let password = '';
	const charset =
		'abcdefghijklmnopqrstuvwxyz!@#$%^&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return password;
};

export const convertToPrimitiveChain = (text, connectedSign = '_') => {
	const slug = removeVietnameseTones(text);

	return slug
		.toLowerCase()
		.trim()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, connectedSign)
		.slice(0, 255);
};

export const removeVietnameseTones = (str) => {
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
	str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
	str = str.replace(/Đ/g, 'D');
	// Some system encode vietnamese combining accent as individual utf-8 characters
	// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
	str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
	// Remove extra spaces
	// Bỏ các khoảng trắng liền nhau
	str = str.replace(/ + /g, ' ');
	str = str.trim();
	// Remove punctuations
	// Bỏ dấu câu, kí tự đặc biệt
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		' '
	);
	return str.toLowerCase();
};

export const formatQueryString = (queryString: string) => {
	let result = queryString;
	if (/'NULL'/i.test(queryString)) {
		result = result.replace(/'NULL'/gi, 'NULL');
	}

	return result;
};

export const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export const hasWhiteSpace = (s) => s.indexOf(' ') >= 0;

export const isNumeric = (value: any) => {
	if (typeof value == 'undefined' || value == null) {
		return false;
	}

	const fmtValue: any = value;
	if (typeof fmtValue == 'string') {
		return false;
	}

	return !isNaN(1 * fmtValue);
};

export const startToday = moment(
	new Date().toLocaleDateString(),
	'YYYY-MM-DD hh:mm:ss',
	true
);

export const distance = (lat1, lon1, lat2, lon2, unit) => {
	const radlat1 = (Math.PI * lat1) / 180;
	const radlat2 = (Math.PI * lat2) / 180;
	const theta = lon1 - lon2;
	const radtheta = (Math.PI * theta) / 180;
	let dist =
		Math.sin(radlat1) * Math.sin(radlat2) +
		Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	if (dist > 1) {
		dist = 1;
	}
	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit == 'K') {
		dist = dist * 1.609344;
	}
	if (unit == 'N') {
		dist = dist * 0.8684;
	}
	return dist;
};

export const checkRestrictedCommentsListIntoRegularExpress = (str) =>
	str
		.split(',')
		.map((item) => `(${item})`)
		.join('|');

export const removeMoreThanOneSpace = (str) => str.replace(/\s\s+/g, ' ');

export const convertIntoQueryParams = (params = {}) => {
	let result = '';
	if (Object.entries(params).length) {
		for (const [i, [key, val]] of Object.entries(params).entries()) {
			if (i === 0) {
				result += `?${key}=${val}`;
				continue;
			}
			result += `&${key}=${val}`;
		}
	}
	return result;
};

export const convertQueryParamsIntoCachedString = (params) => {
	let result = '';
	if (Object.entries(params).length) {
		for (const [i, [key, val]] of Object.entries(params).entries()) {
			result += `-${key}-${val}`;
		}
	}
	return result;
};

export const stringShortener = (longString = '') => {
	const shortString = longString.replace(/[^a-z]/g, '').slice(-4);

	return shortString;
};

export const isJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const checkIsLinkURL = (str) => {
	return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
		str
	);
};

export const isValidPassword = (password) =>
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
		password
	);

export function decodeEntities(encodedString: string) {
	const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
	const translate = {
		nbsp: ' ',
		amp: '&',
		quot: '"',
		lt: '<',
		gt: '>'
	};
	return encodedString
		.replace(translate_re, function (_, entity) {
			return translate[entity];
		})
		.replace(/&#(\d+);/gi, function (_, numStr) {
			const num = parseInt(numStr, 10);
			return String.fromCharCode(num);
		});
}

export const removeWhiteSpace = (str: string) =>
	str.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

export const determineUserCreatUpdate = (user) =>
	`${user.user_appcore_id} - ${user.lastname}`;

export const findSourceRaiseError = (pathName) => {
	if (new RegExp(process.env.WEB_DOMAIN, 'gi').test(pathName))
		return 'Website';
	if (new RegExp(process.env.CORE_API, 'gi').test(pathName)) return 'Appcore';
	if (new RegExp(process.env.CMS_URL, 'gi').test(pathName)) return 'CMS';
	return 'API';
};

export function debounce(delayInms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, delayInms);
	});
}

export const getListUrlComponent = (url) => {
	if (!url.trim()) return '';
	return url
		.trim()
		.split('/')
		.filter((searchItem) => searchItem != '/' && searchItem.trim());
};

export const vietNamesePhoneValidation =
	/((03|05|07|08|09)+([0-9]{8}))\b|((02)+([0-9]{9}))\b|(^(19)+([0-9]{6,8}))\b|(^(18)+([0-9]){6,8})\b/;

export const passwordValidation =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const getAcccessTokenAndSecretKey = () => ({
	accessToken: generateRandomString(20),
	secretKey: genRandomString(10)
});

export const resolveCachingResponse = (res) => {
	if (res) {
		if (isJsonString(res)) {
			return JSON.parse(res);
		} else {
			return res;
		}
	}
	return null;
};

export const convertCachingValueIntoJSON = (value) => {
	if (isJsonString(value)) return value;
	return JSON.parse(removeWhiteSpace(JSON.stringify(value)));
};

export const parseDataSqlizeResponse = (data) =>
	JSON.parse(JSON.stringify(data));

export const joinArgumentsToString = (...args): string => {
	let str = '';

	args.forEach((argItem, i) => {
		if (i !== 0 && argItem) {
			str += ', ';
		}
		str += argItem;
	});

	return str;
};

export const joinIntoAddress = (
	provinceName: string = null,
	districtName: string = null,
	wardName: string = null,
	address: string = null
): string => {
	return [address, wardName, districtName, provinceName]
		.filter(Boolean)
		.join(', ');
};

export function getKeyByValue(object: any, value: string | number) {
	return Object.keys(object).find((key) => object[key] == value);
}

export const mergeArray = (
	initArr: any[],
	insertedArr: any[],
	index: number
) => {
	const _initArr = [...initArr];
	return [
		...initArr.slice(0, index),
		...insertedArr,
		..._initArr.slice(index, initArr.length)
	];
};
export const removeUndefinedObjectProperty = (obj: object): any => {
	return Object.entries(obj).filter(([_, val]) => val !== undefined);
};

export const isEmptyObject = (obj: any): boolean =>
	obj && typeof obj === 'object'
		? Object.entries(removeUndefinedObjectProperty(obj)).length === 0
		: true;

export const cartesian = (...a: any) =>
	a.reduce((a: any, b: any) =>
		a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
	);

export function filterData<T extends any>(data: any): T {
	if (typeof data !== 'object') return data;

	return Object.entries(data).reduce((newObj, [key, val]) => {
		if (
			(typeof val !== 'object' && ![undefined, null].includes(val)) ||
			!isEmptyObject(val)
		) {
			newObj[key] = val;
		}
		return newObj;
	}, {}) as T;
}

export const geneUniqueKey = () => {
	const uid = new ShortUniqueId();
	return uid();
};

export const formatMonthDateString = (dm: string): string =>
	dm.toString().length === 1 ? '0' + dm : dm;

export const genOrderCode = (currentOrderId) => {
	return [
		`OMS`,
		formatMonthDateString(String(new Date().getDate())),
		formatMonthDateString(String(new Date().getMonth() + 1)),
		String(new Date().getFullYear()).slice(-2),
		String(currentOrderId)
	].join('');
};

export const hasProperty = (obj, key) =>
	Object.prototype.hasOwnProperty.call(obj, key);

