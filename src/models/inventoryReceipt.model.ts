import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { Seller } from './seller.model';
import { WarehouseStaff } from './warehouseStaff.model';
import { Warehouse } from './warehouse.model';
import { InventoryReceiptDetail } from './inventoryReceiptDetail.model';
import { InventoryReceiptStatusEnum } from '../common/constants/enum';

@Table({
	tableName: 'inventory_receipts',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class InventoryReceipt extends Model {
	@ForeignKey(() => Seller)
	@Column({
		allowNull: false
	})
	declare seller_id: number;
	@BelongsTo(() => Seller)
	seller: Seller;

	@ForeignKey(() => Warehouse)
	@Column({
		allowNull: false
	})
	declare warehouse_id: number;
	@BelongsTo(() => Warehouse)
	warehouse: Warehouse;

	@ForeignKey(() => WarehouseStaff)
	@Column({
		comment: 'Nhân viên kiểm hàng'
	})
	declare warehouse_inventory_staff_id: number;
	@BelongsTo(() => WarehouseStaff)
	inventory_staff: WarehouseStaff;

	@Column({
		type: DataType.DATE,
		comment: 'Ngày kiểm hàng'
	})
	inventory_at: string;

	// @ForeignKey(() => WarehouseStaff)
	@Column({
		comment: 'Nhân viên cân bằng'
	})
	declare warehouse_balance_staff_id: number;
	// @BelongsTo(() => WarehouseStaff)
	// balance_staff: WarehouseStaff;

	@Column({
		type: DataType.DATE,
		comment: 'Ngày cân bằng'
	})
	balance_at: string;

	@Column({
		type: DataType.TEXT
	})
	declare note: string;

	@Column({
		defaultValue: InventoryReceiptStatusEnum['Chờ kiểm hàng'],
		comment:
			'Trạng thái - 1: Chờ kiểm hàng, 2: Đang kiểm hàng, 3: Đã kiểm hàng'
	})
	declare status: number;

	@Column({
		type: DataType.STRING
	})
	declare created_by: string;

	// @HasMany(() => InventoryReceiptDetail)
	// details: InventoryReceiptDetail[];
}
