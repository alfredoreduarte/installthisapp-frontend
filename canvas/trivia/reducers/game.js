import _ from 'lodash'

const game = (state = {
	timeOut: 0,
	countDownRunning: false,
	isFetching: true,
	done: false,
}, action) => {
	switch (action.type) {
		case 'RECEIVE_SETTINGS':
			return {
				...state,
				timeOut: action.payload.timeLimit
			}
		case 'COUNTDOWN_PROGRESS':
			return {
				...state,
				timeOut: state.timeOut - 1
			}
		case 'TOGGLE_ACTIVITY_INDICATOR':
			return {
				...state,
				isFetching: !state.isFetching
			}
		case 'TOGGLE_DONE':
			return {
				...state,
				done: true
			}
		case 'TOGGLE_COUNTDOWN':
			return {
				...state,
				countDownRunning: !state.countDownRunning
			}
		default:
			return state
	}
}

export default game