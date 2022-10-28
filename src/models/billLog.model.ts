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
import { Bill } from './bill.model';
import { Province } from './province.model';

@Table({
	tableName: 'bill_logs',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class BillLog extends Model {
	@ForeignKey(() => Bill)
	@Column
	declare bill_id: number;
	@BelongsTo(() => Bill)
	bill: Bill;

	@ForeignKey(() => Province)
	@Column
	declare province_id: number;
	@BelongsTo(() => Province)
	province: Province;

	@Column({})
	declare bill_status_log: number;

	@Column({
		type: DataType.TEXT
	})
	declare reason: string;
}
