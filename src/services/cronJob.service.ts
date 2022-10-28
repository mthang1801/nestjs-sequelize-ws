import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fsExtra from 'fs-extra';
import { join } from 'path';

@Injectable()
export class CronJobService {
	/**
	 * Clear logs file every 15 days starting on 1st of the month
	 */
	@Cron('* * * 1/15 * *')
	async clearLogsEvery2Weeks() {
		const logsDir = join(process.cwd(), 'logs');
		const listFiles = await fsExtra.readdir(logsDir);
		await Promise.all(
			listFiles.map((fileName) => {
				const filePath = join(logsDir, fileName);
				fsExtra.writeFileSync(filePath, '', 'utf8');
			})
		);
	}
}
