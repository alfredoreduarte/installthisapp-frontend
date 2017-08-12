import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, deleteFromApi } from 'api'

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

export const fetchDestinationTypeSettings = destinationType => {
	return dispatch => {
		if (destinationType == 'email') {
			return dispatch(receiveFbDestinationSettings(
				[
					{
						label: 'Comma-separated Email recipients',
						key: "recipients",
						//
						recipients: [],
					},
					{
						label: 'Mask Reply-to as',
						key: "replyTo",
						// 
						replyTo: null
					}
				]
			))
		}
	}
}

export const destroyFbLeadDestination = id => {
	return dispatch => {
		return deleteFromApi(`fb_lead_destinations/${id}.json`).then(() => {
			return dispatch(removeFbLeadDestination(id))
		})
	}
}

export const newFbLeadDestination = () => {
	return (dispatch, getState) => {
		const fbLeadformId = getLeadformsWithPages(getState())[0].id
		const settings = {
			"recipients": "alfredoreduarte@gmail.com"
		}
		return postToApi(`fb_lead_destinations.json`, { 
			fbLeadformId: fbLeadformId,
			destinationType: 'email',
			status: 'on',
			settings: {
				settings
			},
		})
		.then(response => dispatch(addFbLeadDestination(response)))
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}