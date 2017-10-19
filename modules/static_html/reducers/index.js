import entities from 'modules/static_html/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const static_html = (state = defaultState, action) => {
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

export default static_html