import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	Logger,
	NestInterceptor
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isEmptyObject } from 'src/utils/functions.utils';
import { HttpMessageResponseByStatusCode } from '../constants/constant';
export interface Response<T> {
	data: T;
}

export interface Paging {
	currentPage: number;
	pageSize: number;
	total: number;
}

interface ResponseData {
	success: boolean;
	statusCode: number;
	data: any;
	paging?: Paging;
	message: string | string[];
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	private logger = new Logger(TransformInterceptor.name);
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<Response<T>> {
		const res = context.switchToHttp().getResponse();
		const req: Request = context.switchToHttp().getRequest();

		this.loggingRequestParams(req);

		const statusCode = res.statusCode || 200;

		return next.handle().pipe(
			map(
				(res) => {
					return this.responseData(res, statusCode);
				},
				catchError((err) => {
					throw new HttpException(
						err?.response?.message || err.message,
						err.status
					);
				})
			)
		);
	}

	loggingRequestParams(req: Request) {
		this.logger.log(`${req.method} ${req.originalUrl}`);

		if (Object.entries(req.body).length) {
			console.log('\n=============== Request Body =================\n');
			for (const [key, val] of Object.entries(req.body)) {
				console.log(`${key} = ${JSON.stringify(val, null, 4)}`);
			}
			console.log('\n==============================================\n');
		}

		if (Object.entries(req.query).length) {
			console.log(
				'\n=============== Request Query Parameters =================\n'
			);
			for (const [key, val] of Object.entries(req.query)) {
				console.log(`${key} = ${val}`);
			}
			console.log(
				'\n==========================================================\n'
			);
		}

		if (Object.entries(req.params).length) {
			console.log(
				'\n================ Request Parameters ================n'
			);
			for (const [key, val] of Object.entries(req.params)) {
				console.log(`${key} = ${val}`);
			}
			console.log(
				'\n====================================================\n'
			);
		}
	}

	responseData(res: any, statusCode): ResponseData {
		let data: any = res || null;
		const success = statusCode < 400;
		const paging = res?.paging;

		if (data?.paging) {
			delete data.paging;
		}

		let message =
			res?.message ||
			HttpMessageResponseByStatusCode[statusCode] ||
			'Lỗi hệ thống.';

		if (res && typeof res === 'object' && res.hasOwnProperty('data')) {
			if (Object.entries(res).length === 1) {
				data = res.data;
			}

			if (
				Object.entries(res).length === 2 &&
				res.hasOwnProperty('message')
			) {
				Object.entries(res).forEach(([key, val]) => {
					if (key === 'message') {
						message = val;
					} else {
						data = val;
					}
				});
			}
		}

		if (isEmptyObject(data)) {
			if (typeof data === 'object' && Array.isArray(data)) {
				data = [];
			} else {
				data = null;
			}
		}

		const response: ResponseData = {
			success,
			statusCode,
			data: data,
			message
		};

		if (paging) {
			response.paging = paging;
		}

		return response;
	}
}
