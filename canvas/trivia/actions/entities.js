import _ from 'lodash'
import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { getFromApi, getExternal } from 'canvas/api'
import * as schema from 'canvas/trivia/schema'
import { toggleActivityIndicator } from 'canvas/trivia/actions/activityIndicators'

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const { checksum, canvasId } = getState().applicationData
		return getFromApi(`${checksum}/entities.json`).then( json => {
			const payload = normalize(json, schema.payload)
			// const isEmpty = _.isEmpty(payload.entities.questions)
			// if (!isEmpty) {
				// console.log('questions list NOT empty')
				return dispatch(receiveEntities(payload.entities))
				// dispatch(toggleActivityIndicator())
				// if (_.filter(payload.entities.questions, { 'answered': false }).length == 0) {
					// dispatch(push(`/${canvasId}/${checksum}/thanks`))
				// }
				// else{
					// dispatch(push(`/${canvasId}/${checksum}/questions`))
					// dispatch(toggleCountDown())
				// }
			// }
			// else {
				// console.log('questions list empty')
				// dispatch(push(`/${canvasId}/${checksum}/already-played`))
			// }
		})
	}
}