import media from 'modules/catalog/reducers/media'

const entities = (state = {
	products: {},
	media: {},
	categories: {},
}, action) => {
	switch (action.type) {
		case 'CATALOG/RECEIVE_ENTITIES':
			return {
				...state,
				...action.entities,
			}
		case 'CATALOG/REMOVE_MEDIUM':
			return {
				...state,
				media: media(state.media, action)
			}
		case 'CATALOG/ADD_MEDIUM':
			return {
				...state,
				media: media(state.media, action)
			}
		default:
			return state
	}
}

export default entities