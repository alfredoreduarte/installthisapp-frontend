import entities from 'modules/memory_match/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const memoryMatch = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'MEMORY_MATCH/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
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