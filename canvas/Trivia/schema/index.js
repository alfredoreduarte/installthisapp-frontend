import { Schema, arrayOf } from 'normalizr'

export const question = new Schema('questions')
export const option = new Schema('options')

question.define({
	options: arrayOf(option)
})

export const entities = {
	questions: arrayOf(question),
	options: arrayOf(option)
}