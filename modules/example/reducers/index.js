import entities from 'modules/example/reducers/entities'

const example = (state = {
	entities: {},
}, action) => {
	switch (action.type) {
		case 'EXAMPLE/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		default:
			return state
	}
}

export default example