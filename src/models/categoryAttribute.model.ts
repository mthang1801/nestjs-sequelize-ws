import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Attribute } from './attribute.model';
import { Category } from './category.model';

@Table({ tableName: 'category_attributes', timestamps: false })
export class CategoryAttribute extends Model {
	@ForeignKey(() => Category)
	@Column
	declare category_id: number;

	@ForeignKey(() => Attribute)
	@Column
	declare attribute_id: number;

	@Column({ defaultValue: 9999 })
	declare index: number;
}
