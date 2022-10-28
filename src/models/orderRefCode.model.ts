import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'order_ref_codes', initialAutoIncrement : "100001" })
export class OrderRefCode extends Model {
	@Column
	ref_code: string;
}
