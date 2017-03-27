const apps = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_APP':
			return {
				...state,
				[action.checksum]: {
					...state[action.checksum],
					...action.payload,
				},
			}
		case 'DELETE_APP':
			return {
				...state,
				[action.checksum]: {
					...state[action.checksum],
					status: 'deleted',
				},
			}
		case 'INSTALLING_APP':
			return {
				...state,
				[action.checksum]: {
					...state[action.checksum],
					status: 'installing',
				},
			}
		case 'CANCEL_INSTALLING_APP':
			return {
				...state,
				[action.checksum]: {
					...state[action.checksum],
					status: 'ready',
				},
			}
		case 'UNINSTALLING_APP':
			return {
				...state,
				[action.checksum]: {
					...state[action.checksum],
					status: 'uninstalling',
				},
			}
		default:
			return state
	}
}

export default apps