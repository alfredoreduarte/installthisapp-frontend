const admin = (state = {
	fbPageIdentifierForIntegration: null,
	currentApp: null
}, action) => {
	switch (action.type) {
		case 'FB_LEADFORMS/ADD':
			const updated = [ ...state.fbLeadforms, action.payload]
			return {
				...state,
				fbLeadforms: updated,
			}
		case 'FB_LEADFORMS/REMOVE':
			const removed = state.fbLeadforms.map(fbLeadform => {
				if (fbLeadform.id == action.id) {
					return {
						...fbLeadform,
						deleted: true,
					}
				}
				else {
					return fbLeadform
				}
			})
			return {
				...state,
				fbLeadforms: removed,
			}
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