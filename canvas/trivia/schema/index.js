import { Schema, arrayOf } from 'normalizr'

const question = new Schema(
	'questions', 
	{
		defaults: { 
			answered: false
		}
	}
)

const option = new Schema('options')

question.define({
	options: arrayOf(option)
})

export const payload = {
	questions: arrayOf(question),
	options: arrayOf(option)
}