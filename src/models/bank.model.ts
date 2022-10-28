import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'm_banks',
	timestamps: true,
	updatedAt: true,
	underscored: true
})
export class Bank extends Model {
	@Column({
		type: DataType.STRING(512),
		allowNull: false
	})
	declare bank_name: string;
}
