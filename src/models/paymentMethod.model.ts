import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { OrderPaymentDetail } from './orderPaymentDetail.model';

@Table({
	tableName: 'm_payment_methods',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class PaymentMethod extends Model {
	@Column
	declare payment_method: string;

}
