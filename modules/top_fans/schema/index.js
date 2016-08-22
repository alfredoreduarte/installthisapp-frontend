import { Schema, arrayOf } from 'normalizr'

export const question = new Schema('questions', {
	idAttribute: 'id'
})
export const option = new Schema('options')
export const answer = new Schema('answers')

question.define({
	options: arrayOf(option)
})

export const entities = {
	questions: arrayOf(question),
	answers: arrayOf(answer),
}