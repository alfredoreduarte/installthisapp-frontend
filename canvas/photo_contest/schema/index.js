import { Schema, arrayOf } from 'normalizr'

export const photo = new Schema('photos')

const vote = new Schema('votes')

photo.define({
	votes: arrayOf(vote)
})

export const payload = {
	photos: arrayOf(photo),
	votes: arrayOf(vote),
}