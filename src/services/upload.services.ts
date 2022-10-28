import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fsExtra from 'fs-extra';
import { configService } from 'src/configs/configService';
import { UploadFileDto } from 'src/dtos/requests/upload.request.dto';

@Injectable()
export class UploadService {
	constructor() {}
	async uploadFiles(data: UploadFileDto, files: Array<Express.Multer.File>) {
		if (!files.length) return;
		const formData: any = new FormData();
		for (const file of files) {
			formData.append('files', await fsExtra.createReadStream(file.path));
		}
		formData.append('object', data.object);
		formData.append('object_id', data.object_id);
		if (data.object_type) {
			formData.append('object_type', data.object_type);
		}

		const config: any = {
			method: 'post',
			url: configService.UploadConfig().uploadAPI,
			headers: {
				...formData.getHeaders(),
				'Content-Type': 'multipart/form-data',
				['auth-uuid']: configService.UploadConfig().cdnSecurityUploadUrl
			},
			data: formData
		};

		try {
			const response: any = await axios(config);

			if (!response?.data) {
				throw new HttpException(
					'Upload không thành công, CDN không phản hồi',
					500
				);
			}
			const result = response.data.data.map((data) => data);

			for (const file of files) {
				fsExtra.unlink(file.path);
			}

			return result;
		} catch (error) {
			for (const file of files) {
				fsExtra.unlink(file.path);
			}
			if (error?.response?.status == 413) {
				throw new HttpException(
					'Upload không thành công, kích thước file quá lớn.',
					413
				);
			}
			throw new HttpException(
				`Có lỗi xảy ra : ${
					error?.response?.data?.message ||
					error?.response?.data ||
					error.message
				}`,
				error?.response?.status || error.status
			);
		}
	}

	async getFile(q: string) {
		return `${configService.UploadConfig().cdnUrl}/${q}`;
	}
}
