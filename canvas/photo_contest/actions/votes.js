import { postToApi } from 'canvas/api'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import Cookies from 'js-cookie'
import * as schema from 'canvas/photo_contest/schema'
import { receiveEntities } from 'canvas/photo_contest/actions/entities'

const vote = id => {
	return {
		type: 'VOTE',
		id,
	}
}

export const postVote = id => {
	return (dispatch, getState) => {
		const apiKey = Cookies.get('apiKey') || window.canvasApiKey
		if (apiKey) {
			const { checksum } = getState().applicationData
			return postToApi(`${checksum}/vote.json`, {
				vote: {
					photoId: id,
				},
			}).then(response => {
				const payload = normalize(response, schema.photo)
				dispatch(receiveEntities(payload.entities))
				return Promise.resolve(response)
			})
		}
	}
}
