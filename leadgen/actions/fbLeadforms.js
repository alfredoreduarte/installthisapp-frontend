import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, patchToApi, deleteFromApi } from 'api'
import { toggleLeadgenFormSpinner } from 'leadgen/actions/ui'

export const sendTestLead = id => {
	return dispatch => {
		return postToApi(`fb_leadforms/${id}/test.json`)
		.then(response => {
			console.log('res', response)
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
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
		return getFromApi(`fb_pages/${fbPageIdentifier}/fetch_leadgen_forms.json`).then( response => {
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
			return patchToApi(`fb_leadforms/${fbLeadform.id}.json`, { 
				fbLeadform,
			})
			.then(response => {
				if (response) {
					dispatch(updateFbLeadform(response))
				}
			})
			.catch(exception =>
				console.log('postNewApp: parsing failed', exception)
			)
		}
		else {
			return postToApi(`fb_leadforms.json`, { 
				fbLeadform,
			})
			.then(response => {
				if (response) {
					analytics.track('LeadForm Created', () => {
						dispatch(addFbLeadform(response))
					})
				}
			})
			.catch(exception =>
				console.log('postNewApp: parsing failed', exception)
			)
		}
	}
}