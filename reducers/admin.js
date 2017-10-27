import _ from 'lodash'

const admin = (
	state = {
		fbPageIdentifierForIntegration: null,
		currentApp: null,
	},
	action
) => {
	switch (action.type) {
		case 'FB_LEADFORMS/ADD':
			const updated = [...state.fbLeadforms, action.payload]
			return {
				...state,
				fbLeadforms: updated,
			}
		case 'FB_LEADFORMS/UPDATE':
			const forms = state.fbLeadforms.map(form => {
				if (form.id == action.payload.id) {
					return action.payload
				} else {
					return form
				}
			})
			return {
				...state,
				fbLeadforms: forms,
			}
		case 'FB_LEADFORMS/REMOVE':
			const removed = state.fbLeadforms.map(fbLeadform => {
				if (fbLeadform.id == action.id) {
					return {
						...fbLeadform,
						deleted: true,
					}
				} else {
					return fbLeadform
				}
			})
			return {
				...state,
				fbLeadforms: removed,
			}
		case 'FB_LEAD_DESTINATIONS/ADD':
			const destUpdated = [...state.fbLeadDestinations, action.payload]
			return {
				...state,
				fbLeadDestinations: destUpdated,
			}
		case 'FB_LEAD_DESTINATIONS/UPDATE':
			const destinations = state.fbLeadDestinations.map(destination => {
				if (destination.id == action.payload.id) {
					return action.payload
				} else {
					return destination
				}
			})
			return {
				...state,
				fbLeadDestinations: destinations,
			}
		case 'FB_LEAD_DESTINATIONS/REMOVE':
			const destRemoved = state.fbLeadDestinations.map(fbLeadDestination => {
				if (fbLeadDestination.id == action.id) {
					return {
						...fbLeadDestination,
						deleted: true,
					}
				} else {
					return fbLeadDestination
				}
			})
			return {
				...state,
				fbLeadDestinations: destRemoved,
			}
		case 'SET_CURRENT_APP':
			return {
				...state,
				currentApp: action.checksum,
			}
		case 'SET_FB_PAGE_IDENTIFIER_FOR_INTEGRATION':
			return {
				...state,
				fbPageIdentifierForIntegration: action.payload,
			}
		case 'RECEIVE_ADMIN':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default admin
