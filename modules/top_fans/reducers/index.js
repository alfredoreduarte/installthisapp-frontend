import _ from 'lodash'
// import settings from 'modules/top_fans/reducers/settings'
import ui from 'modules/top_fans/reducers/ui'
import wizard from 'modules/top_fans/reducers/wizard'

const topFans = (state = {
	// settings: {},
	wizard: wizard(undefined, {}),
	log: {},
	ui: {},
	entries: {},
}, action) => {
	switch (action.type) {
		// case 'TOP_FANS/RECEIVE_SETTINGS':
			// return { ...state, settings: settings(state.settings, action) }
		case 'UPDATE_WIZARD_STEP':
		case 'WIZARD_UPDATE_FB_PAGE':
		case 'WIZARD_TOGGLE_TRACK_FROM_DATE':
		case 'WIZARD_TOGGLE_DATE_PICKER':
			return {
				...state,
				wizard: wizard(state.wizard, action),
			}
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