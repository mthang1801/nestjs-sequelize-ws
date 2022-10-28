import { Global, Module } from '@nestjs/common';
import { CronJobService } from 'src/services/cronJob.service';

@Global()
@Module({
	providers : [CronJobService],
	exports : [CronJobService]
})
export class CronJobModule {}
