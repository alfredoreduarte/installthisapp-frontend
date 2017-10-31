import { Schema, arrayOf } from 'normalizr'

export const entry = new Schema('entries', {
	idAttribute: 'id',
})

export const entities = {
	entries: arrayOf(entry),
}
