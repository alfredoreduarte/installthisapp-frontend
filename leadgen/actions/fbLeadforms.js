import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, deleteFromApi } from 'api'
import { toggleLeadgenFormSpinner } from 'leadgen/actions/ui'

// export const receiveFbLeadforms = fbLeadforms => ({
// 	type: 'FB_LEADFORMS/RECEIVE',
// 	fbLeadforms,
// })

export const sendTestLead = id => {
	return dispatch => {
		return postToApi(`fb_webhooks.json`, {
			"entry":[
				{
					"changes":[
						{
							"field":"leadgen",
							"value":{
								"ad_id":0,
								"form_id":342988009476934,
								"leadgen_id":343201192788949,
								"created_time":1502560453,
								"page_id":272699880986,
								"adgroup_id":0
							}
						}
					],
					"id":"272699880986",
					"time":1502560454
				}
			],
			"object":"page"
		})
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