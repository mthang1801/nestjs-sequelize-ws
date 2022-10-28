import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';
import { Seller } from './seller.model';
import { vietNamesePhoneValidation } from '../utils/functions.utils';
import { WarehouseStaffLevelEnum } from '../common/constants/enum';

@Table({
	tableName: 'warehouse_staffs',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class WarehouseStaff extends Model {
	@ForeignKey(() => Seller)
	@Column({
		allowNull: false
	})
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@Column({
		type: DataType.STRING(256)
	})
	declare warehouse_staff_name: string;

	@Column({
		allowNull: false,
		defaultValue: WarehouseStaffLevelEnum['Nhân viên kho']
	})
	declare level: number;

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
}
