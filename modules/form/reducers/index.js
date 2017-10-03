import entities from 'modules/form/reducers/entities'

const form = (state = {
	log: {},
	entities: {},
}, action) => {
	switch (action.type) {
		case 'FORM/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default form