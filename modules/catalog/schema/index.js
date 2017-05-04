import { Schema, arrayOf } from 'normalizr'

export const category = new Schema('categories')
export const product = new Schema('products')
export const medium = new Schema('media')

export const entities = {
	products: arrayOf(product),
	categories: arrayOf(category),
	media: arrayOf(medium),
}