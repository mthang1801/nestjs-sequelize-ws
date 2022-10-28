import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { DiscountTypeEnum } from '../common/constants/enum';
import { Order } from './order.model';
import { Product } from './product.model';

@Table({
	tableName: 'order_details',
	timestamps: true,
	updatedAt: true,
	underscored: true,
	paranoid: true
})
export class OrderDetail extends Model {
	@ForeignKey(() => Order)
	@Column
	declare order_id: number;

	@BelongsTo(() => Order)
	order: Order;

	@Column({
		type: DataType.STRING(50),
		allowNull: false
	})
	declare sku: string;

	@Column
	declare barcode: string;

	@ForeignKey(() => Product)
	@Column({
		allowNull: false
	})
	declare product_id: number;

	@BelongsTo(() => Product)
	product: Product;

	@Column({
		type: DataType.STRING(256),
		allowNull: false
	})
	declare product_name: string;

	@Column({
		allowNull: false,
		defaultValue: 0
	})
	declare quantity: number;

	@Column({
		type: DataType.DECIMAL(12)
	})
	declare price: number;

	@Column({
		type: DataType.FLOAT,
		defaultValue: 0
	})
	declare discount: number;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(DiscountTypeEnum),
		defaultValue: DiscountTypeEnum.Fixed
	})
	declare discount_type: DiscountTypeEnum;

	@Column({
		type: DataType.DECIMAL(12)
	})
	declare total_money_amount: number;

	@Column({
		type: DataType.DECIMAL(12)
	})
	declare final_total_money_amount: number;
}
