import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import {
	CustomerRankingEnum,
	CustomerTypeEnum,
	UserGenderEnum
} from 'src/common/constants/enum';
import { CustomerShipping } from './customerShipping.model';
import { Order } from './order.model';
import { Seller } from './seller.model';

@Table({
	tableName: 'customers',
	underscored: true,
	timestamps: true,
	updatedAt: true,
	paranoid: true,
	indexes: [
		{
			name: 'customer_fullname_phone_email',
			fields: ['fullname', 'phone', 'email']
		}
	]
})
export class Customer extends Model {
	@ForeignKey(() => Seller)
	@Column
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@Column({ allowNull: false })
	declare fullname: string;

	@Column
	declare email: string;

	@Column
	declare phone: string;

	@Column({ defaultValue: true })
	declare status: boolean;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(UserGenderEnum),
		defaultValue: UserGenderEnum.Female
	})
	declare gender: UserGenderEnum;

	@Column({ type: DataType.DATEONLY })
	declare date_of_birth: Date;

	@Column({ defaultValue: 0 })
	declare total_points: number;

	@Column({ defaultValue: 0 })
	declare total_money_purchase: number;

	@Column({ defaultValue: 0 })
	declare total_amount_purchase: number;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(CustomerTypeEnum),
		defaultValue: CustomerTypeEnum.Normal
	})
	declare customer_type: string;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(CustomerRankingEnum),
		defaultValue: CustomerRankingEnum.Normal
	})
	declare ranking: string;

	@HasMany(() => CustomerShipping)
	shipping_info: CustomerShipping[];

	@HasMany(() => Order)
	orders: Order[];
}
