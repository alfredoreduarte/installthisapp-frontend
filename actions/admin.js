import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
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
	const experimentTrialOfferVariation = payload.id % 2 == 0 ? 'With photo' : 'Without photo'
	analytics.identify(payload.id, {
		name: payload.name,
		email: payload.email,
		created_at: payload.createdAt,
		confirmed_at: payload.confirmedAt,
		facebook_pages: payload.facebookPages,
		applications: payload.applications,
		published_applications: payload.publishedApplications,
		plan: 'demo',
		'Experiment: Trial Offer': experimentTrialOfferVariation,
	})
	profitwell('user_email', payload.email)
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
		analytics.track('Facebook Connected')
		dispatch({
			type: 'TOGGLE_ACTIVITY/CONNECTING_FACEBOOK'
		})
		return postToApi('fb_profiles.json', {
			identifier: fbResponse.id,
			signedRequest: fbResponse.signedRequest,
		}).then( response => {
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
}