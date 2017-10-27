const deleteApp = (
	state = {
		checksum: null,
	},
	action
) => {
	switch (action.type) {
		case 'SET_DELETE_APP':
			return Object.assign({}, state, {
				checksum: action.checksum,
			})
		default:
			return state
	}
}

export default deleteApp
