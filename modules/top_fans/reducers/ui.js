import _ from 'lodash'

const ui = (state = {
	showResetModal: false,
	isCurrentlyPolling: false,
}, action) => {
	switch (action.type) {
		case 'TOP_FANS/TOGGLE_RESET_MODAL':
			return {
				...state,
				showResetModal: !state.showResetModal,
			}
		case 'TOP_FANS/TOGGLE_POLLING_STATE':
			return {
				...state,
				isCurrentlyPolling: !state.isCurrentlyPolling,
			}
		default:
			return state
	}
}

export default ui