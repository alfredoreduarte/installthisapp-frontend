import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi } from 'canvas/api'

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
			console.log('api res')
			console.log(response)
			if (response.status == 'ok') {
				dispatch(receiveLikes(response.likes))
				dispatch(push(`/${canvasId}/${checksum}`))
			}
		})
	}
}