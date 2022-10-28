import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.model';
import { Product } from './product.model';

@Table({
	tableName: 'product_categories',
	underscored: true,
	timestamps: true,
	paranoid: true
})
export class ProductCategory extends Model {
	@ForeignKey(() => Product)
	@Column
	declare product_id: number;

	@ForeignKey(() => Category)
	@Column
	declare category_id: number;

	@Column({ defaultValue: 9999 })
	declare index: number;
}
