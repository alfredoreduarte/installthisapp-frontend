import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, patchToApi, deleteFromApi } from 'api'
import {
	toggleLeadgenFormSpinner,
	indicateLeadTestSent,
	indicateLeadTestReceived,
	indicateLeadTestBroadcasted,
	receiveTestLeadData,
	showSourceTestModal,
} from 'leadgen/actions/ui'

let pollTestLeadArrivalInterval

export const sendTestLead = (id, testDestinations) => {
	return dispatch => {
		dispatch(indicateLeadTestSent())
		return postToApi(`fb_leadforms/${id}/test.json`)
			.then(response => {
				console.log('sendTestLead response: ', response)
				if (response.id) {
					dispatch(pollTestLeadArrival(response.id, testDestinations))
				}
			})
			.catch(exception => console.log('postNewApp: parsing failed', exception))
	}
}

export const getTestLead = id => {
	return dispatch => {
		return getFromApi(`fb_leadforms/${id}/get_existing_test_lead.json`)
			.then(response => {
				console.log('getTestLead response: ', response)
				if (response) {
					dispatch(receiveTestLeadData(response.fieldData))
				}
			})
			.catch(exception => console.log('postNewApp: parsing failed', exception))
	}
}

export const stopPollTestArrival = () => {
	return dispatch => {
		clearInterval(pollTestLeadArrivalInterval)
	}
}

export const pollTestLeadArrival = (leadId, testDestinations) => {
	return dispatch => {
		pollTestLeadArrivalInterval = setInterval(() => {
			getFromApi(`fb_leadforms/${leadId}/poll_test_arrival.json`)
				.then(response => {
					console.log('pollTestLeadArrival response: ', response)
					if (response) {
						dispatch(indicateLeadTestReceived())
						dispatch(receiveTestLeadData(response.fieldData))
						if (testDestinations) {
							dispatch(pollTestLeadNotificationDelivery(leadId))
						}
						clearInterval(pollTestLeadArrivalInterval)
					}
				})
				.catch(exception => console.log('postNewApp: parsing failed', exception))
		}, 5000)
	}
}

export const pollTestLeadNotificationDelivery = leadId => {
	return dispatch => {
		const pollTestLeadNotificationDeliveryInterval = setInterval(() => {
			getFromApi(`fb_leadforms/${leadId}/poll_test_notification_delivery.json`)
				.then(response => {
					console.log('pollTestLeadNotificationDelivery response:', response)
					if (response) {
						dispatch(indicateLeadTestBroadcasted())
						clearInterval(pollTestLeadNotificationDeliveryInterval)
					}
				})
				.catch(exception => console.log('postNewApp: parsing failed', exception))
		}, 8000)
	}
}

export const removeFbLeadform = id => ({
	type: 'FB_LEADFORMS/REMOVE',
	id,
})

export const updateFbLeadform = fbLeadform => ({
	type: 'FB_LEADFORMS/UPDATE',
	payload: fbLeadform,
})

export const addFbLeadform = fbLeadform => ({
	type: 'FB_LEADFORMS/ADD',
	payload: fbLeadform,
})

export const receiveFbLeadgenForms = fbLeadgenForms => ({
	type: 'FB_LEADGEN_FORMS/RECEIVE',
	payload: fbLeadgenForms,
})

export const fetchLeadgenFormsForPage = fbPageIdentifier => {
	return dispatch => {
		dispatch(toggleLeadgenFormSpinner())
		return getFromApi(`fb_pages/${fbPageIdentifier}/fetch_leadgen_forms.json`).then(response => {
			if (response) {
				dispatch(toggleLeadgenFormSpinner())
				return dispatch(receiveFbLeadgenForms(response.data))
			}
		})
	}
}

export const destroyFbLeadform = id => {
	return dispatch => {
		return deleteFromApi(`fb_leadforms/${id}.json`).then(() => {
			return dispatch(removeFbLeadform(id))
		})
	}
}

export const newFbLeadform = () => {
	return (dispatch, getState) => {
		const fbLeadform = getState().form.fbLeadFormCreate.values
		if (fbLeadform.id) {
			// Editing
			return patchToApi(`fb_leadforms/${fbLeadform.id}.json`, {
				fbLeadform,
			})
				.then(response => {
					if (response) {
						dispatch(updateFbLeadform(response))
					}
				})
				.catch(exception => console.log('newFbLeadform: parsing failed', exception))
		} else {
			// Creating a new one
			return postToApi(`fb_leadforms.json`, {
				fbLeadform,
			})
				.then(response => {
					if (response) {
						analytics.track('LeadForm Created', () => {
							dispatch(addFbLeadform(response))
							dispatch(showSourceTestModal(response.id))
						})
					}
				})
				.catch(exception => console.log('postNewApp: parsing failed', exception))
		}
	}
}
