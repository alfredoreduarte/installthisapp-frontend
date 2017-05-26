import _ from 'lodash'

const ui = (state = {
	showContactModal: false,
	productListDisplayMode: 'grid',
	productRequestSent: false,
}, action) => {
	switch (action.type) {
		case 'TOGGLE_MODAL/CONTACT':
			return {
				...state,
				productRequestSent: false,
				showContactModal: !state.showContactModal,
			}
		case 'TOGGLE_DISPLAY_MODE':
			return {
				...state,
				productListDisplayMode: state.productListDisplayMode == 'grid' ? 'list' : 'grid',
			}
		case 'TOGGLE_REQUEST_SENT':
			return {
				...state,
				productRequestSent: !state.productRequestSent,
			}
		default:
			return state
	}
}

export default ui