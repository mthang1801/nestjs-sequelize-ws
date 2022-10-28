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
	OrderStatusEnum,
	PaymentStatusEnum,
	ShippingStatusEnum,
	UserGenderEnum
} from 'src/common/constants/enum';
import { Customer } from './customer.model';
import { OrderDetail } from './orderDetail.model';
import { OrderPaymentDetail } from './orderPaymentDetail.model';
import { OrderStatusLog } from './orderStatusLog.model';
import { Platform } from './platform.model';
import { Seller } from './seller.model';
import { ShippingStatusLog } from './shippingStatusLog.model';
import { ShippingUnit } from './shippingUnit.model';
import { Warehouse } from './warehouse.model';

@Table({
	tableName: 'orders',
	timestamps: true,
	updatedAt: true,
	underscored: true,
	indexes: [
		{
			fields: ['b_phone', 'b_fullname', 'b_email', 'order_code'],
			name: 'b_phone__b_fullname__b_email__order_code'
		}
	]
})
export class Order extends Model {
	@ForeignKey(() => Seller)
	@Column
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@ForeignKey(() => Platform)
	@Column
	declare platform_id: number;

	@Column
	declare platform_name: string;

	@BelongsTo(() => Platform)
	platform: Platform;

	@Column({
		type: DataType.STRING(18),
		unique: true
	})
	declare order_code: string;

	@Column({ defaultValue: false })
	receive_at_store: boolean;

	@ForeignKey(() => Customer)
	@Column
	declare customer_id: number;

	@BelongsTo(() => Customer)
	customer: Customer;

	@ForeignKey(() => Warehouse)
	@Column
	declare warehouse_id: number;

	@BelongsTo(() => Warehouse)
	warehouse: Warehouse;

	@Column
	declare order_platform_id: number;

	@Column({
		type: DataType.STRING(64)
	})
	declare order_platform_code: string;

	@Column({
		defaultValue: OrderStatusEnum.Mới
	})
	declare order_status_id: number;

	@Column
	declare order_status_name: string;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(PaymentStatusEnum),
		defaultValue: PaymentStatusEnum['Chưa thanh toán']
	})
	declare payment_status: PaymentStatusEnum;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(ShippingStatusEnum)
	})
	declare shipping_status: ShippingStatusEnum;

	@Column
	declare total_quantity: number;

	@Column({
		defaultValue: 0
	})
	declare total_discount_money_amount: number;

	@Column({
		defaultValue: 0
	})
	declare shipping_fee: number;

	@Column
	declare voucher_code: string;

	@Column({ type: DataType.DECIMAL(12), comment: 'Giá trị mã coupon' })
	declare voucher_value: number;

	@Column({
		type: DataType.DECIMAL(12),
		defaultValue: 0
	})
	declare temp_total_money_amount: number;

	@Column({
		type: DataType.DECIMAL(12),
		defaultValue: 0
	})
	declare final_total_money_amount: number;

	@ForeignKey(() => ShippingUnit)
	@Column
	declare shipping_unit_id: number;

	@BelongsTo(() => ShippingUnit)
	shipping_unit: ShippingUnit;

	@Column
	declare shipping_unit_name: string;

	@Column({
		type: DataType.STRING(128),
		comment: 'Mã vận đơn'
	})
	declare delivery_code: string;

	@Column
	declare delivery_type_id: number;

	@Column
	declare delivery_type_name: string;

	@Column
	declare delivery_payment_method_id: number;

	@Column
	declare delivery_payment_method_name: string;

	@Column({ type: DataType.DECIMAL(12) })
	declare cod: number;

	@Column
	declare payment: number;

	@Column({ type: DataType.DECIMAL(12) })
	declare paid_money_amount: number;

	@Column
	declare weight: number;

	@Column
	declare length: number;

	@Column
	declare width: number;

	@Column
	declare height: number;

	@Column
	declare customer_platform_id: number;

	@Column({
		type: DataType.STRING(256)
	})
	declare b_fullname: string;

	@Column({
		type: DataType.STRING(20)
	})
	declare b_phone: string;

	@Column({
		type: DataType.STRING(256)
	})
	declare b_email: string;

	@Column({
		type: DataType.DATE
	})
	declare b_dob: string;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(UserGenderEnum),
		comment: Object.entries(UserGenderEnum)
			.map(([key, val]) => `${key} : ${val}`)
			.join(', ')
	})
	declare b_gender: UserGenderEnum;

	@Column({
		type: DataType.STRING(256)
	})
	declare s_fullname: string;

	@Column
	declare s_province_id: number;

	@Column({
		type: DataType.STRING(128)
	})
	declare s_province: string;

	@Column
	declare s_district_id: number;

	@Column({
		type: DataType.STRING(128)
	})
	declare s_district: string;

	@Column
	declare s_ward_id: number;

	@Column({
		type: DataType.STRING(128)
	})
	declare s_ward: string;

	@Column({
		type: DataType.STRING(256)
	})
	declare s_address: string;

	@Column({
		type: DataType.STRING(20)
	})
	declare s_phone: string;

	@Column({
		type: DataType.STRING(256)
	})
	declare s_email: string;

	@Column({
		type: DataType.TEXT
	})
	declare notes: string;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm bắt đầu vận chuyển"
	})
	declare delivery_date: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm xác nhận đơn"
	})
	declare confirmed_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm đóng gói hoàn tất"
	})
	declare packaged_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm Chờ vận chuyển"
	})
	declare push_shipping_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm giao hàng"
	})
	declare delivery_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm hoàn hàng"
	})
	declare returned_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm huỷ đơn"
	})
	declare canceled_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm giao thành công"
	})
	declare delivery_success_at: Date;

	@Column({
		type: DataType.DATE,
		comment : "Thời điểm hoàn tất đơn"
	})
	declare closed_at: Date;

	@Column({ type: DataType.DECIMAL(12), comment: 'tiền cước' })
	declare carriage: number;

	@Column({ comment: 'Người nhận phí trả cước' })
	declare carriage_forward: string;

	@Column
	declare delivery_request: string;

	@Column({
		type: DataType.TEXT,
		comment: 'Ghi chú giao hàng'
	})
	declare delivery_note: string;

	@HasMany(() => OrderDetail)
	details: OrderDetail[];

	@HasMany(() => OrderPaymentDetail)
	order_payment_details: OrderPaymentDetail[];

	@HasMany(() => OrderStatusLog)
	order_status_logs: OrderStatusLog[];

	@HasMany(() => ShippingStatusLog)
	shipping_status_logs: ShippingStatusLog[];
}
