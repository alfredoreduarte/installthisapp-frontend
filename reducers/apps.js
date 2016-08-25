const apps = (state = {}, action) => {
	switch (action.type) {
		case 'DELETE_APP':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					status: 'deleted'
				})
			})
		case 'SET_APP_FB_APPLICATION':
			return Object.assign({}, state, {
				[action.checksum]: Object.assign({}, state[action.checksum], {
					fbApplication: action.fbApplication,
					fbApplicationId: action.fbApplication.id,
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