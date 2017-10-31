import { getFromApi, postToApi } from 'canvas/api'
import { push } from 'react-router-redux'
import { fetchEntities, resetEntitiesCacheFlag } from 'canvas/capture_the_flag/actions/entities'

export const claim = () => {
	return (dispatch, getState) => {
		const state = getState()
		const { checksum } = state.applicationData
		return postToApi(`${checksum}/claim.json`).then(() => {
			dispatch(resetEntitiesCacheFlag())
			return dispatch(fetchEntities()).then(() => dispatch(push(`/capture_the_flag/${window.checksum}/main-screen`)))
		})
	}
}

export const clickCaptcha = src => {
	return (dispatch, getState) => {
		const state = getState()
		const { checksum } = state.applicationData
		if (src == state.images.captcha.correct) {
			return dispatch(claim())
		} else {
			return dispatch(push(`/capture_the_flag/${window.checksum}/`))
		}
	}
}
