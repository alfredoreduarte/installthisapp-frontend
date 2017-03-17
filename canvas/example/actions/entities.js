import { getFromApi, getExternal } from 'canvas/api'
import { push } from 'react-router-redux'

export const receiveEntities = payload => ({
	type: 'RECEIVE_ENTITIES',
	payload,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum } = getState().applicationData
		return getFromApi(`${checksum}/entities.json`, response => {
			if (response.success) {
				return dispatch(receiveEntities(response))
			}
		})
	}
}