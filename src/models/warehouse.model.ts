import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { vietNamesePhoneValidation } from '../utils/functions.utils';
import { District } from './district.model';
import { Order } from './order.model';
import { Province } from './province.model';
import { Seller } from './seller.model';
import { Ward } from './ward.model';
import { WarehouseStaff } from './warehouseStaff.model';

@Table({
	tableName: 'warehouses',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class Warehouse extends Model {
	@ForeignKey(() => Seller)
	@Column({
		allowNull: false
	})
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@ForeignKey(() => WarehouseStaff)
	@Column({
		allowNull: false
	})
	declare warehouse_manager_id: number;

	@BelongsTo(() => WarehouseStaff)
	warehouse_manager: WarehouseStaff;

	@Column({
		type: DataType.STRING(256)
	})
	declare warehouse_code: string;

	@Column({
		type: DataType.STRING(256)
	})
	declare warehouse_name: string;

	@Column({
		type: DataType.STRING(512)
	})
	declare full_address: string;

	@Column({
		type: DataType.STRING(255)
	})
	declare address: string;

	@ForeignKey(() => Province)
	@Column
	declare province_id: number;
	@BelongsTo(() => Province)
	province: Province;

	@ForeignKey(() => District)
	@Column
	declare district_id: number;
	@BelongsTo(() => District)
	district: District;

	@ForeignKey(() => Ward)
	@Column
	declare ward_id: number;
	@BelongsTo(() => Ward)
	ward: Ward;

	@Column
	declare province_name: string;

	@Column
	declare district_name: string;

	@Column
	declare ward_name: string;

	@Column
	declare longitude: string;

	@Column
	declare latitude: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		validate: {
			is: vietNamesePhoneValidation
		}
	})
	declare phone: string;

	@Column({
		defaultValue: true,
		comment: 'Trạng thái hoạt động. 1 : active, 0: disabled'
	})
	declare status: boolean;

	@Column({
		defaultValue: 0
	})
	declare qty_in_stock: number;

	@HasMany(() => Order)
	orders: Order[];
}
