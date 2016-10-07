import { postFileToApi } from 'canvas/api'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import Cookies from 'js-cookie'
import * as schema from 'canvas/photo_contest/schema'
import { receiveEntities } from 'canvas/photo_contest/actions'

const vote = id => {
	return {
		type: 'VOTE',
		id
	}
}

export const postVote = id => {
	return (dispatch, getState) => {
		const apiKey = Cookies.get('apiKey') || window.canvasApiKey
		if (apiKey) {
			const { checksum } = getState().applicationData
			let formData = new FormData()
			formData.append('vote[photo_id]', id)
			return postFileToApi(`${checksum}/vote.json`, formData)
					.then(response => {
						const payload = normalize(response, schema.photo)
						dispatch(receiveEntities(payload.entities))
						return Promise.resolve(response)
					})
		}
		else {
			dispatch(push({
				pathname: `/${window.canvasId}/${window.checksum}/login`,
				state: { nextPathname: `/${window.canvasId}/${window.checksum}/${id}` },
			}))
			return Promise.resolve({})
		}
	}
}