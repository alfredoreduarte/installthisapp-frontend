import entities from 'modules/memory_match/reducers/entities'

const memoryMatch = (state = {
	entities: {},
}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		default:
			return state
	}
}

export default memoryMatch