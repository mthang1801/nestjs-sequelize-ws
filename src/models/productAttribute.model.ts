import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Attribute } from './attribute.model';
import { AttributeValue } from './attributeValue.model';
import { Product } from './product.model';

@Table({
	tableName: 'product_attributes',
	timestamps: true,
	updatedAt: true,
	paranoid: false,
	underscored: true
})
export class ProductAttribute extends Model {
	@ForeignKey(() => Product)
	@Column
	product_id: number;

	@BelongsTo(() => Product)
	product: Product;

	@ForeignKey(() => Attribute)
	@Column
	attribute_id: number;

	@BelongsTo(() => Attribute)
	attribute: Attribute;

	@ForeignKey(() => AttributeValue)
	value_id: number;

	@BelongsTo(() => AttributeValue)
	value: AttributeValue;
}
