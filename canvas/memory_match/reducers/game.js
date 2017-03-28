import moment from 'moment'

const game = (state = {
	startingTime: null,
	currentTime: null,
	clickCount: 0,
	flippedCard: null,
	currentId: null,
	matchedIds: [],
	finished: false,
}, action) => {
	switch (action.type) {
		case 'FLIP_CARD':
			return {
				...state,
				flippedCard: action.flippedCardId,
				currentId: action.id,
				clickCount: state.clickCount + 1,
				// The first FLIP_CARD saves the starting time
				startingTime: state.startingTime ? state.startingTime : moment().toISOString(),
				matchedIds: action.id == state.currentId ? [...state.matchedIds, action.id] : state.matchedIds
			}
		case 'TIMER_TICK':
			return {
				...state,
				// Save the current time at each tick
				currentTime: moment().toISOString(),
			}
		case 'FINISH_GAME':
			return {
				...state,
				// Save the current time at each tick
				finished: true,
			}
		default:
			return state
	}
}

export default game