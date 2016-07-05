import { Schema, arrayOf } from 'normalizr'

export const app = new Schema('apps', {
	idAttribute: 'checksum'
})
export const page = new Schema('pages')
export const user = new Schema('users')

app.define({
	users: arrayOf(user),
	page
})