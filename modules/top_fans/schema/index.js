import { Schema, arrayOf } from 'normalizr'

export const like = new Schema('likes', {
	idAttribute: 'id'
})
// export const option = new Schema('options')
// export const answer = new Schema('answers')

// question.define({
// 	options: arrayOf(option)
// })

export const entities = {
	likes: arrayOf(like)
}