import { BelongsToMany, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Funct } from "./funct.model";
import { Role } from './role.model';

@Table({tableName : "role_functs", timestamps : false})
export class RoleFunct extends Model{
	@ForeignKey(() => Role)
	@Column
	declare role_id : number

	@ForeignKey(() => Funct)
	@Column
	declare funct_id : number
}