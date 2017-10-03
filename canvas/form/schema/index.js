import { Schema, arrayOf } from 'normalizr'

export const schema = new Schema('schema')

export const entities = {
	schema: arrayOf(schema),
}