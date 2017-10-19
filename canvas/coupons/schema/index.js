import { Schema, arrayOf } from 'normalizr'

export const voucher = new Schema('voucher')

export const entities = {
	voucher: arrayOf(voucher),
}