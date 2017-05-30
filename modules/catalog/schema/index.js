import { Schema, arrayOf } from 'normalizr'

export const category = new Schema('categories')
export const message = new Schema('messages')
export const product = new Schema('products')
export const medium = new Schema('media')

product.define({
	messages: arrayOf(message)
})

export const entities = {
	products: arrayOf(product),
	categories: arrayOf(category),
	media: arrayOf(medium),
}