import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CachingService {
	constructor(private readonly redisService: RedisService) {}

	exist(key: string): Promise<boolean> {
		const client = this.redisService.getClient();

		return new Promise(async (resolve, reject) => {
			client.exists(key, (err, resp) =>
				err ? reject(err) : resolve(resp === 1)
			);
		});
	}

	hashSet(key: string, field: string, value: string): Promise<void> {
		const client = this.redisService.getClient();

		return new Promise(async (resolve, reject) => {
			client.hset(key, field, value, (err, res) =>
				err ? reject(err) : resolve()
			);
		});
	}

	hashGet(key: string, field: string): Promise<any> {
		const client = this.redisService.getClient();

		return new Promise((resolve, reject) => {
			client.hget(key, field, (err, res) =>
				err ? reject(err) : resolve(res || null)
			);
		});
	}

	hashGetAll(key: string): Promise<any> {
		const client = this.redisService.getClient();

		return new Promise((resolve, reject) => {
			client.hgetall(key, (err, res) =>
				err ? reject(err) : resolve(res || null)
			);
		});
	}

	enQueue(key: string, value: string) {
		const client = this.redisService.getClient();

		return new Promise((resolve, reject) => {
			client.rpush(key, value, (err, res) =>
				err ? reject(err) : resolve(res || null)
			);
		});
	}

	get(key: string): Promise<any> {
		const client = this.redisService.getClient();

		return new Promise((resolve, reject) => {
			client.get(key, (err, res) =>
				err ? reject(err) : resolve(res || null)
			);
		});
	}

	set(key: string, value: string): Promise<void> {
		const client = this.redisService.getClient();

		return new Promise((resolve, reject) => {
			client.set(key, value, (err, res) =>
				err ? reject(err) : resolve()
			);
		});
	}
}
