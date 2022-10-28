import * as crypto from 'crypto';

export class Cryptography {
	private _encoding = 'base64';
	private _algorithm = 'aes-256-cbc';
	private _secretKey = Buffer.from(process.env.SECURITY_KEY, 'base64');
	private _ivKey = crypto.randomBytes(16).fill(0);
	constructor() {}

	//Encrypting text
	public encrypt(text) {
		const cipher = crypto.createCipheriv(
			this._algorithm,
			this._secretKey,
			this._ivKey
		);
		const buffer = Buffer.concat([cipher.update(text), cipher.final()]);
		return this.encodeBase64(buffer);
	}

	// Decrypting text
	public decrypt(encryptedData: string) {
		const decipher = crypto.createDecipheriv(
			this._algorithm,
			this._secretKey,
			this._ivKey
		);
		const buffer = Buffer.concat([
			decipher.update(Buffer.from(encryptedData, 'base64')),
			decipher.final()
		]);
		return buffer.toString();
	}

	public generateSHA512(str, secretKey: string = null) {
		if (secretKey) {
			return crypto
				.createHmac('sha256', secretKey)
				.update(str)
				.digest('hex');
		}
		return crypto.createHash('sha512').update(str).digest('hex');
	}

	public uuid(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
			/[xy]/g,
			function (c) {
				const r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	}

	public genRandomString(length): string {
		return crypto
			.randomBytes(Math.ceil(+length / 2))
			.toString('hex')
			.slice(0, length);
	}

	public encodeBase64(str) {
		return Buffer.from(str, 'utf8').toString('base64');
	}

	public decodeBase64(buffer) {
		return Buffer.from(buffer, 'base64').toString('utf8');
	}

	private getStringValue(data) {
		if (typeof data === 'number' || data instanceof Number) {
			return data.toString();
		}
		if (!Buffer.isBuffer(data) && typeof data !== 'string') {
			throw new TypeError(
				'Data for password or salt must be a string or a buffer'
			);
		}

		return data;
	}

	public saltHashPassword(password) {
		const salt = this.genRandomString(10);
		return this.sha512(this.getStringValue(password), salt);
	}

	public desaltHashPassword(password, salt): string {
		const hash = crypto.createHmac('sha512', this.getStringValue(salt));
		hash.update(this.getStringValue(password));

		return hash.digest('hex');
	}

	public sha512(str, _secretKey) {
		const hash = crypto.createHmac(
			'sha512',
			this.getStringValue(_secretKey)
		);
		hash.update(this.getStringValue(str));
		const hashedData = hash.digest('hex');

		return {
			secretKey : _secretKey,
			hashedData
		};
	}

	public generateMD5(str) {
		const hash = crypto.createHash('md5').update(str).digest('hex');
		return hash;
	}

	public uniqueId(id = 0, prefix = '', len = 10) {
		len = Math.min(len, 15)

		const length = len - id.toString().length;
		const max = Math.pow(10, length);
		const min = max / 10;
		const num = Math.floor(Math.random() * (max - min)) + min;

		return `${prefix}${num}${id}`;
	}

	genSecurityKey() {
		return crypto.randomBytes(32).toString('base64');
	}
}
