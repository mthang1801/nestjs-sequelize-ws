import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Catalog } from './catalog.model';
import { Category } from './category.model';

@Table({
	tableName: 'catalog_categories',
	underscored: true,
	timestamps: true,
	updatedAt: true
})
export class CatalogCategory extends Model {
	@ForeignKey(() => Catalog)
	@Column
	declare catalog_id: number;

	@BelongsTo(() => Catalog)
	catalog: Catalog;

	@ForeignKey(() => Category)
	@Column
	declare category_id: number;

	@BelongsTo(() => Category)
	category: Category;

	@Column
	declare status: boolean;
}
