import { Schema, arrayOf } from 'normalizr'

export const item = new Schema('items', {
	idAttribute: 'id'
})

export const entities = {
	items: arrayOf(item),
}