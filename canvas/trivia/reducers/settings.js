import _ from 'lodash'

const settings = (state = { 
	timeOut: 9999, 
	order: 'ASC', 
	countDownRunning: false,
	isFetching: true,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_SETTINGS':
			return _.merge({}, state, action.settings)
		case 'COUNTDOWN_PROGRESS':
			return Object.assign({}, state, {
				timeOut: state.timeOut - 1
			})
		case 'TOGGLE_ACTIVITY_INDICATOR':
			return Object.assign({}, state, {
				isFetching: !state.isFetching
			})
		case 'TOGGLE_COUNTDOWN':
			return Object.assign({}, state, {
				countDownRunning: !state.countDownRunning
			})
		default:
			return state
	}
}

export default settings