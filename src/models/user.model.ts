import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	HasOne,
	Model,
	Table
} from 'sequelize-typescript';
import { UserGenderEnum } from 'src/common/constants/enum';
// import { Seller } from './seller.model';
// import { UserToken } from './userToken.model';
import { formatMySQLTimeStamp } from '../utils/dates.utils';
import { Product } from './product.model';
import { Seller } from './seller.model';
import { UserRole } from './userRole.model';
import { UserToken } from './userToken.model';

@Table({
	tableName: 'users',
	updatedAt: true,
	underscored: true
})
export class User extends Model {
	@Column({
		type: DataType.STRING(255),
		allowNull: false
	})
	declare fullname: string;

	@ForeignKey(() => Seller)
	@Column
	declare seller_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@Column({
		defaultValue: true,
		comment: 'Trạng thái hoạt động của tk'
	})
	declare status: boolean;

	@Column({
		defaultValue: false,
		comment: 'Tài khoản đã được kích hoạt hay chưa'
	})
	declare has_activated: boolean;

	@Column({
		unique: true,
		allowNull: false,
		type: DataType.STRING
	})
	declare email: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
		unique: true
	})
	declare phone: string;

	@Column({ type: DataType.STRING(256) })
	declare password: string;

	@Column({ type: DataType.STRING(20), validate: { len: [0, 10] } })
	declare salt: string;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(UserGenderEnum),
		defaultValue: UserGenderEnum.Female
	})
	declare gender: string;

	@Column({ type: DataType.DATEONLY })
	declare date_of_birth: string;

	@Column({ type: DataType.STRING })
	declare avatar: string;

	@Column({ type: DataType.STRING(128), defaultValue: 'Việt Nam' })
	declare country_name: string;

	@Column
	declare country_id: number;

	@Column({ type: DataType.STRING(128) })
	declare province_name: string;

	@Column
	declare province_id: number;

	@Column({ type: DataType.STRING(128) })
	declare district_name: string;

	@Column
	declare district_id: number;

	@Column({ type: DataType.STRING(128) })
	declare ward_name: string;

	@Column
	declare ward_id: number;

	@Column
	declare address: string;

	@Column
	declare zipcode: number;

	@Column({ type: DataType.DATE, defaultValue: formatMySQLTimeStamp() })
	declare last_login_at: string;

	@Column
	declare createdBy: string;

	@Column
	declare updatedBy: string;

	@HasMany(() => UserToken)
	user_tokens: UserToken[];

	@HasOne(() => UserRole)
	userRole: UserRole;

	@HasMany(() => Product, 'created_by')
	created_products: Product[];

	@HasMany(() => Product, 'updated_by')
	updated_products: Product[];
}
