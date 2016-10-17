const admin = (state = {
	fbPageIdentifierForIntegration: '',
	currentApp: null
}, action) => {
	switch (action.type) {
		case 'SET_CURRENT_APP':
			return { 
				...state,
				currentApp: action.checksum
			}
		case 'SET_FB_PAGE_IDENTIFIER_FOR_INTEGRATION':
			return { 
				...state,
				fbPageIdentifierForIntegration: action.payload
			}
		case 'RECEIVE_ADMIN':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default admin