import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, deleteFromApi } from 'api'
import { showDestinationSuccessModal } from 'leadgen/actions/ui'

// delete later
import { getLeadformsWithPages } from 'leadgen/selectors/fbLeadforms'

export const removeFbLeadDestination = id => ({
	type: 'FB_LEAD_DESTINATIONS/REMOVE',
	id,
})

export const addFbLeadDestination = fbLeadDestination => ({
	type: 'FB_LEAD_DESTINATIONS/ADD',
	payload: fbLeadDestination,
})

export const receiveFbDestinationSettings = settings => ({
	type: 'FB_LEAD_DESTINATIONS/RECEIVE_SETTINGS',
	payload: settings,
})

// export const fetchDestinationTypeSettings = destinationType => {
// 	return dispatch => {
// 		if (destinationType == 'email') {
// 			return dispatch(receiveFbDestinationSettings(
// 				[
// 					{
// 						label: 'Comma-separated Email recipients',
// 						key: "recipients",
// 						//
// 						recipients: [],
// 					},
// 					{
// 						label: 'Mask Reply-to as',
// 						key: "replyTo",
// 						// 
// 						replyTo: null
// 					}
// 				]
// 			))
// 		}
// 	}
// }

export const destroyFbLeadDestination = id => {
	return dispatch => {
		return deleteFromApi(`fb_lead_destinations/${id}.json`).then(() => {
			return dispatch(removeFbLeadDestination(id))
		})
	}
}

export const newFbLeadDestination = () => {
	return (dispatch, getState) => {
		const state = getState()
		const values = state.form.fbLeadDestinationCreate.values
		return postToApi(`fb_lead_destinations.json`, { 
			fbLeadformId: parseInt(values.fbLeadformId),
			destinationType: values.destinationType,
			status: "on",
			settings: values.settings,
		})
		.then(response => {
			dispatch(showDestinationSuccessModal(response.id))
			return analytics.track('FbLeadDestination Created', () => {
				return dispatch(addFbLeadDestination(response))
			})
			
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}