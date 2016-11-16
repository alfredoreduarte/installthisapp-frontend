import _ from 'lodash'

const ui = (state = {
	showResetModal: false
}, action) => {
	switch (action.type) {
		case 'TOP_FANS/TOGGLE_RESET_MODAL':
			return {
				...state,
				showResetModal: !state.showResetModal,
			}
		default:
			return state
	}
}

export default ui