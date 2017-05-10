import _ from 'lodash'

const ui = (state = {
	showContactModal: false,
	productListDisplayMode: 'grid',
}, action) => {
	switch (action.type) {
		case 'TOGGLE_MODAL/CONTACT':
			return {
				...state,
				showContactModal: !state.showContactModal,
			}
		default:
			return state
	}
}

export default ui