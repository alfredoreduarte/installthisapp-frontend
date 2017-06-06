import ui from 'modules/photo_contest/reducers/ui'
import photos from 'modules/photo_contest/reducers/photos'
import votes from 'modules/photo_contest/reducers/votes'

const photoContest = (state = {
	log: {},
	ui: {},
	photos: {},
	votes: {},
}, action) => {
	switch (action.type) {
		case 'PHOTO_CONTEST/SHOW_WINNER_MODAL':
			return {
				...state,
				ui: ui(state.photos, action)
			}
		case 'PHOTO_CONTEST/HIDE_WINNER_MODAL':
			return {
				...state,
				ui: ui(state.photos, action)
			}
		case 'PHOTO_CONTEST/DELETE_PHOTO':
			return {
				...state,
				photos: photos(state.photos, action)
			}
		case 'PHOTO_CONTEST/DELETE_VOTE':
			return {
				...state,
				votes: votes(state.votes, action)
			}
		case 'PHOTO_CONTEST/RECEIVE_ENTITIES':
			return {
				...state, 
				...action.response.entities,
				log: { ...state.log, ...action.response.applicationLog },
			}
		default:
			return state
	}
}

export default photoContest