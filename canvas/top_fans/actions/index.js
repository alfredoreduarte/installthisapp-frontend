import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi } from 'canvas/api'
import humps from 'humps'

export const loginCallback = () => {
	return dispatch => {
		dispatch(fetchEntities())
	}
}

export const receiveLikes = entities => ({
	type: 'RECEIVE_LIKES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return (dispatch, getState) =>{
		const { checksum, canvasId } = getState().applicationData
		getFromApi(`${checksum}/likes.json`, response => {
			if (response.status == 'ok') {
				const camelizedJson = humps.camelizeKeys(response)
				dispatch(receiveLikes(camelizedJson.likes))
				dispatch(push(`/${canvasId}/${checksum}`))
			}
		})
	}
}