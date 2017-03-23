const cards = (state = {}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities.cards,
			}
		case 'MEMORY_MATCH/REMOVE_CARD':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					status: 'deleted'
				}
			}
		case 'MEMORY_MATCH/ADD_CARD':
			return {
				...state,
				[action.card.id]: {
					...action.card,
				}
			}
		default:
			return state
	}
}

export default cards