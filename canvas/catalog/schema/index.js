/**
 * @flow
 */
import { Schema, arrayOf } from 'normalizr'

export const product = new Schema('products')
const category = new Schema('categories')
const medium = new Schema('media')

product.define({
	categories: arrayOf(category),
	media: arrayOf(medium),
})

export const entities = {
	products: arrayOf(product),
}