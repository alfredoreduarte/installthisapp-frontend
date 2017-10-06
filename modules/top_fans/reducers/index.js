import _ from 'lodash'
// import settings from 'modules/top_fans/reducers/settings'
import ui from 'modules/top_fans/reducers/ui'
import wizard from 'modules/top_fans/reducers/wizard'

const defaultState = {
	wizard: wizard(undefined, {}),
	ui: ui(undefined, {}),
	log: {},
	entries: {},
	details: {},
}

const topFans = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
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