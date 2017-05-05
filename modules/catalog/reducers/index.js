import ui from 'modules/catalog/reducers/ui'
import entities from 'modules/catalog/reducers/entities'

const catalog = (state = {
	ui: {},
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
		case 'CATALOG/REMOVE_CATEGORY':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'CATALOG/ADD_CATEGORY':
			return {
				...state,
				entities: entities(state.entities, action)
			}
		case 'CATALOG/SHOW_IMAGE_PICKER':
			return {
				...state, 
				ui: ui(state.ui, action)
			}
		case 'CATALOG/HIDE_IMAGE_PICKER':
			return {
				...state, 
				ui: ui(state.ui, action)
			}
		case 'CATALOG/SHOW_FEATURED_IMAGE_PICKER':
			return {
				...state, 
				ui: ui(state.ui, action)
			}
		case 'CATALOG/HIDE_FEATURED_IMAGE_PICKER':
			return {
				...state, 
				ui: ui(state.ui, action)
			}
		default:
			return state
	}
}

export default catalog