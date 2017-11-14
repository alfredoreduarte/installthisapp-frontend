import { push } from 'react-router-redux'
import { loginCallback } from 'canvas/promo_code/actions/'
import { postToApi } from 'canvas/api'

export const claim = () => {
	return (dispatch, getState) => {
		const state = getState()
		const { code } = state.form.entry.values
		return postToApi(`${checksum}/claim.json`, { code }).then(
			response => {
				if (response.success) {
					// dispatch(receiveCoupon(response))
					dispatch({
						type: 'RECEIVE_ENTRIES_COUNT',
						entriesCount: response.entriesCount,
					})
					return dispatch(push(`/${window.module}/${window.checksum}/thanks`))
				} else {
					return dispatch(push(`/${window.module}/${window.checksum}/invalid`))
				}
			},
			reject => {
				console.log('REJECTITO')
			}
		)
	}
}
