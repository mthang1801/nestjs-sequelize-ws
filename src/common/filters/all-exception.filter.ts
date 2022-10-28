import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionCodeEnum } from '../constants/enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private logger = new Logger(AllExceptionsFilter.name);

	async catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res: Response = ctx.getResponse();
		const req: Request = ctx.getRequest();

		const statusCode = this.getStatusCode(exception);

		const message = this.getMessage(exception);

		this.writeLogger(message, req, exception.name, exception);

		res.status(statusCode).json({
			success: false,
			statusCode,
			data: null,
			message
		});
	}

	getStatusCode(exception: HttpException): number {
		let statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const exceptionName = exception.name;

		if (ExceptionCodeEnum.hasOwnProperty(exceptionName)) {
			statusCode = ExceptionCodeEnum[exceptionName];
		}

		return statusCode;
	}

	getMessage(exception: HttpException): string {
		let messageResponse: any;
		if ((exception as any) instanceof HttpException) {
			messageResponse = exception.getResponse();
		} else if (exception instanceof Error) {
			messageResponse =
				exception['errors'] && Array.isArray(exception['errors'])
					? exception['errors'][0]
					: exception;
		} else {
			messageResponse = 'Internal server';
		}

		let messageResult = '';
		if (messageResponse instanceof Object) {
			if (Array.isArray(messageResponse)) {
				messageResult = messageResponse.filter(Boolean).join(', ');
			} else {
				messageResult = Object.values(messageResponse)
					.filter(Boolean)
					.join(', ');
			}
		} else {
			messageResult = messageResponse;
		}

		return messageResult;
	}

	writeLogger(
		message: string,
		req: Request,
		context: string,
		exception: HttpException
	) {
		const stack = [
			{ stack: exception.stack },
			{ url: req.url },
			{ method: req.method },
			{ body: req.body },
			{ params: req['params'] },
			{ query: req['query'] }
		];

		this.logger.error(message, stack, context);
	}
}
