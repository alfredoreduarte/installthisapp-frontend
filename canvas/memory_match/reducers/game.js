import moment from 'moment'

const game = (state = {
	startingTime: null,
	currentTime: null,
	clickCount: 0,
	flippedCards: [],
	currentId: null,
	matchedIds: [],
	finished: false,
}, action) => {
	switch (action.type) {
		case 'FLIP_CARD':
			return {
				...state,
				flippedCards: state.flippedCards.length == 2 ? [] : [...state.flippedCards, action.flippedCardId],
				// flippedCard: action.flippedCardId,
				// flippedCard: action.id == state.currentId ? action.flippedCardId : null,
				currentId: state.flippedCards.length == 2 ? null : action.id,
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
		case 'RESET_CARDS':
			return {
				...state,
				flippedCards: [],
				currentId: false,
			}
		default:
			return state
	}
}

export default game