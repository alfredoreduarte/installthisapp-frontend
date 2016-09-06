import { Schema, arrayOf } from 'normalizr'

export const photo = new Schema('photos', {
	idAttribute: 'id'
})
export const vote = new Schema('votes')

photo.define({
	votes: arrayOf(vote)
})

export const entities = {
	photos: arrayOf(photo),
	votes: arrayOf(vote),
}