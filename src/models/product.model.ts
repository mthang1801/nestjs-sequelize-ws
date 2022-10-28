import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import {
	ProductLevelEnum,
	ProductStatusEnum,
	ProductTypeEnum
} from 'src/common/constants/enum';
import { Catalog } from './catalog.model';
import { Category } from './category.model';
import { ProductAttribute } from './productAttribute.model';
import { ProductCategory } from './productCategory.model';
import { Seller } from './seller.model';
import { User } from './user.model';

@Table({
	tableName: 'products',
	timestamps: true,
	updatedAt: true,
	paranoid: true,
	underscored: true
})
export class Product extends Model {
	@ForeignKey(() => Seller)
	@Column
	declare seller_id: number;

	@Column
	declare parent_id: number;

	@BelongsTo(() => Seller)
	seller: Seller;

	@Column
	declare product_name: string;

	@Column
	declare sku: string;

	@Column
	declare barcode: string;

	@Column
	declare product_name_vat: string;

	@Column
	declare sku_vat: string;

	@Column
	declare vat: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	declare status: boolean;

	@ForeignKey(() => Catalog)
	@Column
	declare catalog_id: number;

	@BelongsTo(() => Catalog)
	catalog: Catalog;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(ProductStatusEnum),
		defaultValue: ProductStatusEnum['Mới']
	})
	product_status: ProductStatusEnum;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(ProductTypeEnum),
		defaultValue: ProductTypeEnum.Normal,
		comment: 'Loại sản phẩm'
	})
	product_type: ProductTypeEnum;

	@Column({
		type: DataType.ENUM(),
		values: Object.values(ProductLevelEnum),
		defaultValue: ProductLevelEnum.Configure,
		comment: 'Cấp bậc sản phẩm' + Object.keys(ProductLevelEnum).join(', ')
	})
	product_level: ProductLevelEnum;

	@Column({ defaultValue: 0 })
	declare stock_quantity: number;

	@Column({ type: DataType.DECIMAL(12, 0) })
	declare retail_price: number;

	@Column({ type: DataType.DECIMAL(12, 0) })
	declare wholesale_price: number;

	@Column({ type: DataType.DECIMAL(12, 0) })
	declare listed_price: number;

	@Column({ type: DataType.DECIMAL(12, 0) })
	declare return_price: number;

	@Column({ type: DataType.DECIMAL(12, 0) })
	declare import_price: number;

	@Column({ defaultValue: true })
	declare allow_installment: boolean;

	@Column({ type: DataType.TEXT('long') })
	declare description: string;

	@Column({ type: DataType.TEXT })
	declare short_description: string;

	@Column({ type: DataType.TEXT })
	declare other_info: string;

	@Column({ type: DataType.TEXT })
	declare promotion_info: string;

	@Column
	declare video_url: string;

	@Column
	declare thumbnail: string;

	@Column
	declare meta_title: string;

	@Column
	declare meta_keywords: string;

	@Column
	declare meta_image: string;

	@Column
	declare meta_description: string;

	@Column
	declare canonical: string;

	@Column
	declare url: string;

	@Column
	declare redirect_url: string;

	@Column
	declare redirect_type: number;

	@Column
	declare weight: number;

	@Column
	declare length: number;

	@Column
	declare width: number;

	@Column
	declare height: number;

	@Column({
		type: DataType.INTEGER,
		defaultValue: 0
	})
	declare index: number;

	@Column
	declare warranty_months: number;

	@Column
	declare warranty_address: string;

	@Column
	declare warranty_phone: string;

	@Column
	declare warranty_note: string;

	@Column({ type: DataType.JSON })
	declare categories_list: any ;

	@Column
	declare root_category_url: number;

	@ForeignKey(() => User)
	@Column
	declare created_by: number;

	@BelongsTo(() => User)
	creator: User;

	@ForeignKey(() => User)
	@Column
	declare updated_by: number;

	@BelongsTo(() => User)
	updater: User;

	@HasMany(() => ProductAttribute)
	attributes: ProductAttribute;

	@BelongsToMany(() => Category, () => ProductCategory)
	categories: Category[];
}
