import { Schema, arrayOf } from 'normalizr'

export const entry = new Schema('entries')
export const schema = new Schema('schema')

export const entities = {
	entries: arrayOf(entry),
	schema: arrayOf(schema),
}