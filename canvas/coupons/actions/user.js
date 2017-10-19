import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/coupons/actions/'
import { postToApi, writeToApiWithoutAuth } from 'canvas/api'
import { receiveCoupon } from 'canvas/coupons/actions/coupon'
import Cookies from 'js-cookie'

export const logIn = payload => ({
	type: 'LOG_USER_IN',
	payload,
})

export const digestFacebookResponse = response => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { signedRequest } = response.tokenDetail
		const body = {
			signedRequest,
			checksum,
		}
		return writeToApiWithoutAuth(`users.json`, body, response => {
			window.canvasApiKey = response.apiKey
			window.loggedUserId = response.id
			Cookies.set('apiKey', response.apiKey, { expires: 7, path: `/coupons/${checksum}` })
			Cookies.set('loggedUserId', response.id, { expires: 7, path: `/coupons/${checksum}` })
			Cookies.set('loggedUserIdentifier', response.identifier, { expires: 7, path: `/coupons/${checksum}` })
			Cookies.set('loggedUserName', response.name, { expires: 7, path: `/coupons/${checksum}` })
		}).then(() => {
			return postToApi(`${checksum}/vouchers_claim.json`).then(response => {
				if (response.success) {
					dispatch(receiveCoupon(response))
					return dispatch(push(`/${window.module}/${window.checksum}/coupon`))
				}
				else{
					return dispatch(push(`/${window.module}/${window.checksum}/no-coupon`))
				}
			})
		})
	}
}