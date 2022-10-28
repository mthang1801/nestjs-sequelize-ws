import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Order } from './order.model';
import { ShippingUnit } from './shippingUnit.model';

@Table({
	tableName: 'bills',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class Bill extends Model {
	@ForeignKey(() => Order)
	@Column
	declare order_id: number;
	@BelongsTo(() => Order)
	order: Order;

	@Column({
		type: DataType.STRING(18)
	})
	declare bill_code: string;

	@ForeignKey(() => ShippingUnit)
	@Column
	declare shipping_unit_id: number;
	@BelongsTo(() => ShippingUnit)
	shipping_unit: ShippingUnit;

	@Column({
		type: DataType.STRING(256)
	})
	declare b_fullname: string;

	@Column({
		type: DataType.STRING(20)
	})
	declare b_phone: string;

	@Column({
		type: DataType.DECIMAL
	})
	declare shipping_fee: number;

	@Column({
		type: DataType.DECIMAL
	})
	declare cod: number;
}
