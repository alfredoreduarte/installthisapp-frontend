import entities from 'modules/catalog/reducers/entities'

const catalog = (state = {
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

export default catalog