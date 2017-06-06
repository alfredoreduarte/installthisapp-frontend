import entities from 'modules/memory_match/reducers/entities'

const memoryMatch = (state = {
	log: {},
	entities: {},
}, action) => {
	switch (action.type) {
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: { ...state.log, ...action.applicationLog },
			}
		case 'MEMORY_MATCH/REMOVE_CARD':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'MEMORY_MATCH/ADD_CARD':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'MEMORY_MATCH/REMOVE_ENTRY':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		default:
			return state
	}
}

export default memoryMatch