const ui = (state = {}, action) => {
	switch (action.type) {
		case 'PHOTO_CONTEST/SHOW_WINNER_MODAL':
			return {
				...state, 
				showWinnerModal: true,
			}
		case 'PHOTO_CONTEST/HIDE_WINNER_MODAL':
			return {
				...state, 
				showWinnerModal: false,
			}
		default:
			return state
	}
}

export default ui