import { normalize, arrayOf } from 'normalizr'
import * as schema from 'leadgen/schema'
import { getFromApi, postToApi, deleteFromApi } from 'api'

// export const receiveFbLeadforms = fbLeadforms => ({
// 	type: 'FB_LEADFORMS/RECEIVE',
// 	fbLeadforms,
// })

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

// export const fetchFbLeadforms = () => {
// 	return dispatch => {
// 		return getFromApi(`fb_leadforms.json`).then( response => {
// 			if (response) {
// 				console.log('leadforms res', response)
// 				// const normalized = normalize(response, schema.fbLeadforms)
// 				// dispatch(receiveFbLeadforms(normalized.entities))
// 				dispatch(receiveFbLeadforms(response))
// 			}
// 		})
// 	}
// }

export const fetchLeadgenFormsForPage = fbPageIdentifier => {
	return dispatch => {
		return getFromApi(`fb_pages/${fbPageIdentifier}/fetch_leadgen_forms.json`).then( response => {
			if (response) {
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
		.then(response => dispatch(addFbLeadform(response)))
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}