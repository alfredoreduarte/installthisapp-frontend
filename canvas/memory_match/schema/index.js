import { Schema, arrayOf } from 'normalizr'

export const card = new Schema('cards', {
	idAttribute: 'id'
})

export const entities = {
	cards: arrayOf(card),
}