import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Seller } from './seller.model';
import { ShippingUnit } from './shippingUnit.model';

@Table({
	tableName: 'seller_shipping_units',
	timestamps: true,
	updatedAt: true,
	underscored: true,
	paranoid: true
})
export class SellerShippingUnit extends Model {
	@ForeignKey(() => Seller)
	@Column
	declare seller_id: number;

	@ForeignKey(() => ShippingUnit)
	@Column
	declare shipping_unit_id: number;

	@Column({
		defaultValue: false,
		comment: 'Trạng thái kết nối'
	})
	declare connect_status: boolean;

	@Column
	declare code: string;

	@Column({ type: DataType.TEXT })
	declare data: string;

	@Column
	declare last_connected_at: Date;

	@Column
	declare expired_token_at: Date;
}
