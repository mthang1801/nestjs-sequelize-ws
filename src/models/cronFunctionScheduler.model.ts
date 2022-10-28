import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';
import { Seller } from './seller.model';
import { CronFunction } from './cronFunction.model';
import { Scheduler } from './scheduler.model';

@Table({
	tableName: 'cron_function_schedulers',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class CronFunctionScheduler extends Model {
	@ForeignKey(() => Seller)
	@Column({
		allowNull: false
	})
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@ForeignKey(() => CronFunction)
	@Column({
		allowNull: false
	})
	declare cron_function_id: number;

	@BelongsTo(() => CronFunction)
	cron_function: CronFunction;

	@ForeignKey(() => Scheduler)
	@Column({
		allowNull: false
	})
	declare scheduler_id: number;

	@BelongsTo(() => Scheduler)
	scheduler: Scheduler;

	@Column({
		defaultValue: true,
		comment: 'Trạng thái hoạt động. 1 : active, 0: disabled'
	})
	declare status: boolean;

	@Column({
		type: DataType.DATE
	})
	declare start_at: string;

	@Column({
		type: DataType.DATE
	})
	declare stop_at: string;

	@Column({
		type: DataType.DATE
	})
	declare last_run_at: string;
}
