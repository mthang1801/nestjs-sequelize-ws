import {
	BelongsTo,
	Column, DataType, ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({
	tableName: 'order_status_logs',
	timestamps: true,
	updatedAt: false,
	paranoid: true
})
export class OrderStatusLog extends Model {
	@ForeignKey(() => Order)
	@Column
	declare order_id: number;

	@BelongsTo(() => Order)
	order: Order;

	@Column
	declare order_status_id: number;

	@Column
	declare order_status_name: string;

	@Column({ type: DataType.TEXT })
	declare note: string;
}
