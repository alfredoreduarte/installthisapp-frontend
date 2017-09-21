import _ from 'lodash'
// import settings from 'modules/top_fans/reducers/settings'
import ui from 'modules/top_fans/reducers/ui'
import wizard from 'modules/top_fans/reducers/wizard'

const topFans = (state = {
	// settings: {},
	wizard: wizard(undefined, {}),
	log: {},
	ui: ui(undefined, {}),
	entries: {},
	details: {},
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
		case 'TOP_FANS/TOGGLE_POLLING_STATE':
			return {
				...state,
				ui: ui(state.ui, action)
			}
		case 'TOP_FANS/REMOVE_ENTITIES':
			return { 
				...state, 
				entries: {},
			}
		case 'TOP_FANS/RECEIVE_ENTITIES':
			return { 
				...state, 
				entries: action.response.entities, 
				log: action.response.applicationLog
			}
		case 'TOP_FANS/RECEIVE_DETAILS':
			return { 
				...state,
				details: {
					...state.details,
					[action.senderId]: action.payload,
				}
			}
		default:
			return state
	}
}

export default topFans