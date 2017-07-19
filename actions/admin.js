import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { setAlert } from 'actions/alerts'
import { normalize } from 'normalizr'
import * as schema from 'schema'
import { receiveEntities } from 'actions/entities'
import { receivePlans } from 'actions/plans'
import Cookies from 'js-cookie'

export const receiveAdmin = payload => {
	return {
		type: 'RECEIVE_ADMIN',
		payload
	}
}

const identifyAdmin = payload => {
	// const experimentTrialOfferVariation = payload.id % 2 == 0 ? 'With photo' : 'Without photo'
	// 
	// Segment
	// 
	analytics.identify(payload.id, {
		name: payload.name,
		email: payload.email,
		created_at: payload.createdAt,
		confirmed_at: payload.confirmedAt,
		facebook_pages: payload.facebookPages,
		applications: payload.applications,
		published_applications: payload.publishedApplications,
		// plan: 'demo',
		// 'Experiment: Trial Offer': experimentTrialOfferVariation,
	})
	// 
	// Profitwell
	// 
	profitwell('user_email', payload.email)
	// 
	// Samestate
	// 
	// window.Samestate({
	// 	// Required fields. At least one of user_id or email is required.
	// 	token: '2bc168b9dcd4|15d5cb784da', // Your Samestate token
	// 	email: payload.email,

	// 	// Optional properties
	// 	// name: ...,
	// 	// censor: ['.ignore .this', '#and.this'], // Censor fields matching css selectors
	// 	intercom: { // Add this to load user data from Intercom
	// 		user_id: payload.id,
	// 		email: payload.email,
	// 	}
	// })
}

export const fetchAdmin = () => {
	return dispatch => {
		return getFromApi('admins/entities.json').then( response => {
			// Prepare entities for normalization
			const entities = {
				apps: response.applications,
				pages: response.pages,
			}
			dispatch(receivePlans(response.plans)) // Receive plans list
			const normalized = normalize(entities, schema.entities)
			dispatch(receiveEntities(normalized.entities))
			// Sanitize admin user
			const admin = { ...response }
			delete admin.applications
			delete admin.pages
			identifyAdmin({
				...admin,
				facebookPages: response.pages.length,
				applications: response.applications.length,
				publishedApplications: _.filter(response.applications, {'status': 'installed'}).length,
			})
			delete admin.plans
			return dispatch(receiveAdmin(admin))
		})
	}
}

export const logOut = () => {
	return dispatch => {
		// /auth/sign_out
		// Cookies.remove('api_key')
		// top.location.href = '/'
		deleteFromApi(
			'auth/sign_out.json'
		).then( response => {
			top.location.href = '/'
		})
	}
}

export const updateInfo = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAdmin())
		const formData = getState().form.adminUserProfile.values
		patchToApi(
			`auth.json`, 
			{
				name: formData.name,
				email: formData.email,
				currentPassword: formData.currentPassword,
				password: formData.password,
				passwordConfirmation: formData.passwordConfirmation,
			}
		).then( response => {
			dispatch(receiveAdmin(response))
			dispatch(toggleActivityUpdatingAdmin())
		})
	}
}

export const fbConnect = fbResponse => {
	return dispatch => {
		const errorMsg = `We can't install Facebook Page tabs or get the stats if you don't log in and grant the required permissions.`
		if (fbResponse.id ) {
			dispatch({
				type: 'TOGGLE_ACTIVITY/CONNECTING_FACEBOOK'
			})
			let declined = []
			FB.api('/me/permissions', permissionsResponse => {
				permissionsResponse.data.map( perm => {
					if (perm.status === 'declined') { declined.push(perm.permission) } 
				})
				if (declined.length) {
					dispatch({
						type: 'TOGGLE_ACTIVITY/CONNECTING_FACEBOOK'
					})
					dispatch(setAlert(`<b>Error</b>.`, errorMsg))
				}
				else {
					return postToApi('fb_profiles.json', {
						identifier: fbResponse.id,
						signedRequest: fbResponse.signedRequest,
					}).then( response => {
						analytics.track('Facebook Connected')
						dispatch({
							type: 'TOGGLE_ACTIVITY/CONNECTING_FACEBOOK'
						})
						// Prepare entities for normalization
						const entities = {
							apps: response.applications,
							pages: response.pages,
						}
						const normalized = normalize(entities, schema.entities)
						dispatch(receiveEntities(normalized.entities))
						// Sanitize admin user
						const admin = { ...response }
						delete admin.applications
						delete admin.pages
						return dispatch(receiveAdmin(admin))
					})
				}
			})
		}
		else {
			dispatch(setAlert(`<b>Error</b>.`, errorMsg))
		}
	}
}