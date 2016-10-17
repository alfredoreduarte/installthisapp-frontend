import _ from 'lodash'
// import settings from 'modules/top_fans/reducers/settings'

const topFans = (state = {
	// settings: {},
	entries: {},
}, action) => {
	switch (action.type) {
		// case 'TOP_FANS/RECEIVE_SETTINGS':
			// return { ...state, settings: settings(state.settings, action) }
		case 'TOP_FANS/RECEIVE_ENTITIES':
			return { ...state, entries: action.response.entities }
		default:
			return state
	}
}

export default topFans