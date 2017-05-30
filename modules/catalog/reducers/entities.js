import media from 'modules/catalog/reducers/media'
import categories from 'modules/catalog/reducers/categories'
import products from 'modules/catalog/reducers/products'

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
		case 'CATALOG/REMOVE_PRODUCT':
			return {
				...state,
				products: products(state.products, action)
			}
		case 'CATALOG/ADD_MEDIUM':
			return {
				...state,
				media: media(state.media, action)
			}
		case 'CATALOG/REMOVE_CATEGORY':
			return {
				...state,
				categories: categories(state.categories, action)
			}
		case 'CATALOG/ADD_CATEGORY':
			return {
				...state,
				categories: categories(state.categories, action)
			}
		default:
			return state
	}
}

export default entities