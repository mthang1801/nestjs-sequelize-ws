import { configService } from 'src/configs/configService';

import {
	IEncodeUserAuthResponse,
	IUserAuth
} from 'src/interfaces/userAuth.interface';
import { Cryptography } from 'src/utils/cryptography.utils';
import { v4 as uuid } from 'uuid';
import { UserRoleCodeEnum } from '../constants/enum';

const {
	AUTH_USER_ID_POSITION,
	SELLER_ADMIN_UUID,
	NT_ADMIN_UUID,
	AUTH_USER_ROLE_CODE_POSITION,
	AUTH_USER_ROLE_ID_POSITION,
	AUTH_USER_SELLER_ID_POSITION
} = configService.UserAuthentication();

export const convertUserRoleCodeIntoUUID = (roleCode: string) => {
	switch (roleCode) {
		case UserRoleCodeEnum.SellerAdmin:
			return SELLER_ADMIN_UUID;
		case UserRoleCodeEnum.NTAdmin:
			return NT_ADMIN_UUID;
	}

	return roleCode;
};

export const convertUserAuthUUIDIntoUserRole = (uuid: string) => {
	switch (uuid) {
		case SELLER_ADMIN_UUID:
			return UserRoleCodeEnum.SellerAdmin;
		case NT_ADMIN_UUID:
			return UserRoleCodeEnum.NTAdmin;
	}

	return uuid;
};

export const encodeUserAuthentication = (
	userId: number,
	roleCode: string,
	roleId: number,
	sellerId: number
): IEncodeUserAuthResponse => {
	const authUserPositionList = Object.entries(
		configService.UserAuthentication()
	).filter(([_, val]) => typeof val === 'number');
	authUserPositionList.sort((a: any[], b: any[]) => a[1] - b[1]);
	const authUserPositionListMapper = new Map([...authUserPositionList]);

	let randomString: string = uuid();

	const randomStringArray: string[] = randomString.split('-');

	const inputParams = [];
	for (const [i, key] of Object.keys(
		Object.fromEntries(authUserPositionListMapper)
	).entries()) {
		switch (key) {
			case 'AUTH_USER_SELLER_ID_POSITION':
				inputParams[i] = sellerId;
				break;
			case 'AUTH_USER_ID_POSITION':
				inputParams[i] = userId;
				break;
			case 'AUTH_USER_ROLE_CODE_POSITION':
				inputParams[i] = convertUserRoleCodeIntoUUID(roleCode);
				break;
			case 'AUTH_USER_ROLE_ID_POSITION':
				inputParams[i] = roleId;
				break;
		}
	}

	for (const [i, pos] of Object.values(
		Object.fromEntries(authUserPositionListMapper)
	).entries()) {
		randomStringArray.splice(
			pos as number,
			0,
			inputParams[i].toString() as string
		);
	}

	randomString = [...randomStringArray].join('-');

	const cryptography = new Cryptography();
	const encodedString = cryptography.encrypt(randomString);

	return { originalString: randomString, encodedString };
};

export const decodeUserAuthentication = (authString: string): string => {
	const cryptography = new Cryptography();
	const decodeString = cryptography.decrypt(authString);
	return decodeString;
};

export const getUserAuthenticationInfo = (decodeString: string): IUserAuth => {
	const uuidStringArray = decodeString.split('-');
	const userId = uuidStringArray[AUTH_USER_ID_POSITION];
	const roleCode = convertUserAuthUUIDIntoUserRole(
		uuidStringArray[AUTH_USER_ROLE_CODE_POSITION]
	);
	const roleId = uuidStringArray[AUTH_USER_ROLE_ID_POSITION];
	const sellerId = uuidStringArray[AUTH_USER_SELLER_ID_POSITION];

	return {
		userId: parseInt(userId),
		roleCode,
		roleId: parseInt(roleId),
		sellerId: parseInt(sellerId)
	};
};

const adminRoles: string[] = [
	UserRoleCodeEnum.SellerAdmin,
	UserRoleCodeEnum.NTAdmin
];
export const isAdminByRoleCode = (roleCode: string) =>
	adminRoles.includes(roleCode);

const specialAdminRoles: string[] = [UserRoleCodeEnum.NTAdmin];
export const isSpecialAdminByRoleCode = (roleCode: string) =>
	specialAdminRoles.includes(roleCode);
