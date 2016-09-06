import { postFileToApi } from 'canvas/api'
import { push } from 'react-router-redux'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'canvas/photo_contest/schema'
import { receiveEntities } from 'canvas/photo_contest/actions'

const vote = id => {
	return {
		type: 'VOTE',
		id
	}
}

export const postVote = body => {
	return (dispatch, getState) => {
		if (window.canvasApiKey) {
			const { checksum } = getState().applicationData
			return postFileToApi(`${checksum}/vote.json`, body)
					.then(response => {
						const payload = normalize(response, schema.photo)
						dispatch(receiveEntities(payload.entities))
						// dispatch(vote(response.photoId))
						return Promise.resolve(response)
					})
		}
		else {
			dispatch(push(`/${window.canvasId}/${window.checksum}/login`))
			return Promise.resolve({})
		}
	}
}