import entities from 'modules/example/reducers/entities'

const example = (state = {
	log: {},
	entities: {},
}, action) => {
	switch (action.type) {
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

export default example