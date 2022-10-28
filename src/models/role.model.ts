import {
	BelongsTo,
	BelongsToMany,
	Column,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { Funct } from './funct.model';
import { RoleFunct } from './roleFunc.model';
import { Seller } from './seller.model';
import { UserRole } from './userRole.model';

@Table({ timestamps: true, updatedAt: true, underscored: true })
export class Role extends Model {
	@Column
	declare parent_id: number;

	@Column({ defaultValue: true })
	declare status: boolean;

	@Column({ allowNull: false })
	declare role_name: string;

	@Column({ allowNull: false })
	declare role_code: string;

	@Column({ defaultValue: 0 })
	declare level: number;

	@ForeignKey(() => Seller)
	@Column({ allowNull: false })
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@Column
	declare created_by: number;

	@Column
	declare updated_by: number;

	@BelongsToMany(() => Funct, () => RoleFunct)
	functs: Funct[];

	@HasMany(() => UserRole)
	userRoles: UserRole[];
}
