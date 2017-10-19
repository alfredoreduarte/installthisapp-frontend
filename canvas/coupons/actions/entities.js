import { normalize, arrayOf } from 'normalizr'
import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'
import { receiveCoupon } from 'canvas/coupons/actions/coupon'
import * as schema from 'canvas/coupons/schema'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	entities,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { fetched } = getState().entities
		if (fetched) {
			return Promise.resolve(true)
		}
		else {
			return getFromApi(`${checksum}/voucher.json`, response => {
				if (response.success) {
					dispatch(receiveCoupon(response))
				}
				else {
					return dispatch(push(`/${window.module}/${window.checksum}/`))
				}
			})
		}
	}
}