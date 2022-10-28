import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({
	tableName: 'order_payment_details',
	timestamps: true,
	updatedAt: true,
	underscored: true,
	paranoid: true
})
export class OrderPaymentDetail extends Model {
	@ForeignKey(() => Order)
	@Column
	declare order_id: number;

	@BelongsTo(() => Order)
	order?: Order;

	@Column
	declare payment_method_id: number;

	@Column
	declare payment_method_name: string;

	@Column({
		type: DataType.STRING(64)
	})
	declare payment_code?: string;

	@Column({
		type: DataType.DECIMAL
	})
	declare amount?: number;

	@Column({
		type: DataType.DATE
	})
	declare payment_at?: string;
}
