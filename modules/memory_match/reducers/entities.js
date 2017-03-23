import cards from 'modules/memory_match/reducers/cards'

const entities = (state = {
	cards: {},
	entries: {},
}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		case 'MEMORY_MATCH/REMOVE_CARD':
			return {
				...state,
				cards: cards(state.cards, action)
			}
		case 'MEMORY_MATCH/ADD_CARD':
			return {
				...state,
				cards: cards(state.cards, action)
			}
		default:
			return state
	}
}

export default entities