import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { normalize } from 'normalizr'
import * as schema from 'schema'
import { receiveEntities } from 'actions/entities'
import Cookies from 'js-cookie'

export const receiveAdmin = payload => {
	analytics.identify(payload.id, {
		name: payload.name,
		email: payload.email,
	})
	return {
		type: 'RECEIVE_ADMIN',
		payload
	}
}

export const fetchAdmin = () => {
	return dispatch => {
		return getFromApi('admins/entities.json').then( response => {
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
		// const body = 
		patchToApi(
			'auth.json', 
			{
				admin: {
					name: formData.name,
				}
			}
		).then( response => {
			dispatch(receiveAdmin(response))
			dispatch(toggleActivityUpdatingAdmin())
		})
	}
}

export const fbConnect = fbResponse => {
	console.log('fbResponse')
	console.log(fbResponse)
	return dispatch => {
		return postToApi('fb_profiles.json', {
			identifier: fbResponse.id,
			signedRequest: fbResponse.signedRequest,
		}).then( response => {
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