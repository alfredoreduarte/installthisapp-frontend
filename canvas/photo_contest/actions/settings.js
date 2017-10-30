import { normalize, arrayOf } from 'normalizr'
import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'

export const receiveSettings = payload => ({
	type: 'RECEIVE_SETTINGS',
	payload,
})

export const fetchSettings = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		const { fetched } = getState().settings
		if (fetched) {
			return Promise.resolve(true)
		} else {
			return getFromApi(`${checksum}/settings.json`, response => {
				return dispatch(receiveSettings(response))
			})
		}
	}
}
