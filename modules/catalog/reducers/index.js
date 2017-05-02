import entities from 'modules/catalog/reducers/entities'

const catalog = (state = {
	entities: {},
}, action) => {
	switch (action.type) {
		case 'CATALOG/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'CATALOG/REMOVE_MEDIUM':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'CATALOG/ADD_MEDIUM':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		default:
			return state
	}
}

export default catalog