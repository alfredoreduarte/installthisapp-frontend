import _ from 'lodash'
import photos from 'modules/photo_contest/reducers/photos'
import votes from 'modules/photo_contest/reducers/votes'

const photoContest = (state = {
	photos: {},
	votes: {},
}, action) => {
	switch (action.type) {
		case 'PHOTO_CONTEST/DELETE_PHOTO':
			return Object.assign({}, state, {
				photos: photos(state.photos, action)
			})
		case 'PHOTO_CONTEST/DELETE_VOTE':
			return Object.assign({}, state, {
				votes: votes(state.votes, action)
			})
		case 'PHOTO_CONTEST/RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default photoContest