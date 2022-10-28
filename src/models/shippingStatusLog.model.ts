import {
	BelongsTo,
	Column, DataType, ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({
	tableName: 'shipping_status_logs',
	timestamps: true,
	updatedAt: true,
	paranoid: true
})
export class ShippingStatusLog extends Model {
	@ForeignKey(() => Order)
	@Column
	declare order_id: number;

	@BelongsTo(() => Order)
	orders: Order[];

	@Column
	declare shipping_status: number;

	@Column
	declare shipping_status_name: string;

	@Column
	declare last_city_id: number;

	@Column
	declare last_city_name: string;

	@Column
	declare current_city_id: number;

	@Column
	declare current_city_name: string;

	@Column({ type: DataType.TEXT })
	declare note: string;
}
