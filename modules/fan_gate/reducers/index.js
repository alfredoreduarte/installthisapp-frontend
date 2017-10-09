import entities from 'modules/fan_gate/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const fanGate = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'EXAMPLE/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default fanGate