import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Seller } from './seller.model';
import { SellerShippingUnit } from './sellerShippingUnit.model';

@Table({
	tableName: 'shipping_units',
	timestamps: false,
	updatedAt: false
})
export class ShippingUnit extends Model {
	@Column({
		type: DataType.STRING(255)
	})
	declare shipping_unit: string;

	@Column({
		type: DataType.STRING(512)
	})
	declare logo: string;

	@Column({
		defaultValue: true,
		comment: 'Trạng thái hoạt động. 1 : active, 0: disabled'
	})
	declare status: boolean;

	@BelongsToMany(() => Seller, () => SellerShippingUnit)
	sellers: Seller[];

	@HasMany(() => Order)
	orders : Order[]
}
