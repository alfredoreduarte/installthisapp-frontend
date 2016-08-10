const apps = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'deleted'
				})
			})
		case 'INSTALL_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'installed'
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
		case 'UNINSTALL_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'uninstalled'
				})
			})
		default:
			return state
	}
}

export default apps