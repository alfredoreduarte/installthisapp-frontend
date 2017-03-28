import moment from 'moment'

const game = (state = {
	currentTime: null,
	clickCount: 0,
	flippedCard: null,
	currentId: null,
	matchedIds: [],
}, action) => {
	switch (action.type) {
		case 'FLIP_CARD':
			return {
				...state,
				flippedCard: action.flippedCardId,
				currentId: action.id,
				clickCount: state.clickCount + 1,
				currentTime: state.currentTime ? state.currentTime : moment().toISOString(),
				matchedIds: action.id == state.currentId ? [...state.matchedIds, action.id] : state.matchedIds
			}
		case 'SET_TIME':
			return {
				...state,
				currentTime: action.currentTime,
			}
		case 'START_TIMER':
			return {
				...state,
				currentTime: moment().toISOString(),
			}
		default:
			return state
	}
}

export default game