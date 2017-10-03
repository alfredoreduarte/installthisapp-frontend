import { Schema, arrayOf } from 'normalizr'

export const entry = new Schema('entries', {
	idAttribute: 'id'
})
export const schema = new Schema('schema')

export const entities = {
	entries: arrayOf(entry),
	schema: arrayOf(schema),
}