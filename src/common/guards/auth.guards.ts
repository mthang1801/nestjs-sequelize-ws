import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { configService } from 'src/configs/configService';
import { IUserAuth } from 'src/interfaces/userAuth.interface';
import {
	convertUserAuthUUIDIntoUserRole,
	decodeUserAuthentication
} from './auth';
import { Metadata } from './customMetadata';

const {
	AUTH_USER_ID_POSITION,
	AUTH_USER_ROLE_CODE_POSITION,
	AUTH_USER_ROLE_ID_POSITION,
	AUTH_USER_SELLER_ID_POSITION
} = configService.UserAuthentication();
interface IUserToken {
	uuid: string;
	iat: number;
	exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const skipAuth = this.reflector.get<boolean>(
			Metadata.SKIP_AUTH,
			context.getHandler()
		);
		if (skipAuth) return true;

		const request = context.switchToHttp().getRequest();

		const authorization = request.headers['authorization'];
		const uuid = request.headers['x-auth-uuid'];

		if (!authorization || !uuid) return false;

		const checkResult = this.checkTokenBearerAndAuthUUIDValidation(
			authorization,
			uuid
		);

		if (!checkResult) return false;

		const authUUID = decodeUserAuthentication(uuid);

		request['user'] = this.getAuthData(authUUID);
		
		return true;
	}

	checkTokenBearerAndAuthUUIDValidation(
		authorizationBearer: string,
		uuid: string
	): boolean {
		const token = authorizationBearer.split(' ').slice(-1)[0];

		const decodedResult = jwt.verify(
			token,
			configService.getValue('JWT_SECRET_KEY')
		) as IUserToken;

		const { uuid: bearerUUID } = decodedResult;

		const authUUID = decodeUserAuthentication(uuid);

		if (!bearerUUID || !authUUID || bearerUUID !== authUUID) {
			return false;
		}
		return true;
	}

	getAuthData(authUUID: string): IUserAuth {
		const splittedAuthUUID = authUUID.split('-');

		return {
			userId: parseInt(splittedAuthUUID[AUTH_USER_ID_POSITION]),
			roleCode: convertUserAuthUUIDIntoUserRole(
				splittedAuthUUID[AUTH_USER_ROLE_CODE_POSITION]
			),
			roleId: parseInt(splittedAuthUUID[AUTH_USER_ROLE_ID_POSITION]),
			sellerId: parseInt(splittedAuthUUID[AUTH_USER_SELLER_ID_POSITION])
		};
	}
}
