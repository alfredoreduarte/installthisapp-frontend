import { Schema, arrayOf } from 'normalizr'

export const voucher = new Schema('vouchers')

export const entities = {
	vouchers: arrayOf(voucher),
}