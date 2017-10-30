import entities from 'modules/photo_contest/reducers/entities'
import ui from 'modules/photo_contest/reducers/ui'

const defaultState = {
	log: {},
	ui: {},
	entities: {},
}

const example = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'PHOTO_CONTEST/SHOW_WINNER_MODAL':
			return {
				...state,
				ui: ui(state.ui, action),
			}
		case 'PHOTO_CONTEST/HIDE_WINNER_MODAL':
			return {
				...state,
				ui: ui(state.ui, action),
			}
		case 'PHOTO_CONTEST/DELETE_PHOTO':
			return {
				...state,
				entities: entities(state.photos, action),
			}
		case 'PHOTO_CONTEST/DELETE_VOTE':
			return {
				...state,
				entities: entities(state.votes, action),
			}
		case 'PHOTO_CONTEST/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default example
