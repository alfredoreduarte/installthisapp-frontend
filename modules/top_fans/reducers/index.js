import _ from 'lodash'
// import settings from 'modules/top_fans/reducers/settings'
import ui from 'modules/top_fans/reducers/ui'

const topFans = (state = {
	// settings: {},
	log: {},
	ui: {},
	entries: {},
}, action) => {
	switch (action.type) {
		// case 'TOP_FANS/RECEIVE_SETTINGS':
			// return { ...state, settings: settings(state.settings, action) }
		case 'TOP_FANS/TOGGLE_RESET_MODAL':
			return {
				...state,
				ui: ui(state.ui, action)
			}
		case 'TOP_FANS/RECEIVE_ENTITIES':
			return { 
				...state, 
				entries: action.response.entities, 
				log: action.response.applicationLog
			}
		default:
			return state
	}
}

export default topFans