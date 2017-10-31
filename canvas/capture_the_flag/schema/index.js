import { Schema, arrayOf } from 'normalizr'

export const entry = new Schema('entries')
export const timeLeft = new Schema('timeLeft')

export const entities = {
	entries: arrayOf(entry),
	timeLeft: timeLeft,
}
