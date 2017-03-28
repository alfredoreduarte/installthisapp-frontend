import cards from 'modules/memory_match/reducers/cards'
import entries from 'modules/memory_match/reducers/entries'

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
		case 'MEMORY_MATCH/REMOVE_ENTRY':
			return {
				...state,
				entries: entries(state.entries, action)
			}
		default:
			return state
	}
}

export default entities