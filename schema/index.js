// @flow
import { Schema, arrayOf } from 'normalizr'

export const app = new Schema('apps', {
  idAttribute: 'checksum',
})
export const page = new Schema('pages')
export const user = new Schema('users')

app.define({
  users: arrayOf(user),
  page,
})

export const entities = {
  apps: arrayOf(app),
  pages: arrayOf(page),
  users: arrayOf(user),
}
