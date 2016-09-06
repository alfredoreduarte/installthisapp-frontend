import _ from 'lodash'
import photos from 'canvas/photo_contest/reducers/photos'

const entities = (state = {}, action) => {
	switch (action.type) {
		case 'VOTE':
			return _.photos({}, state.photos, action)
		case 'RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default entities