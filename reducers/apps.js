const apps = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], action.payload)
			})
		case 'DELETE_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'deleted'
				})
			})
		case 'INSTALLING_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'installing'
				})
			})
		case 'UNINSTALLING_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'uninstalling'
				})
			})
		default:
			return state
	}
}

export default apps