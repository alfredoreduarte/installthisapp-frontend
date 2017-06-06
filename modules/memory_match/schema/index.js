import { Schema, arrayOf, valuesOf } from 'normalizr'

export const entry = new Schema('entries')
export const card = new Schema('cards')

export const entities = {
	entries: arrayOf(entry),
	cards: arrayOf(card),
}