import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { getFromApi, patchToApi } from 'api'
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
				apps: response.admin.applications,
				// pages: response.adminUser.fbPages,
			}
			const normalized = normalize(entities, schema.entities)
			dispatch(receiveEntities(normalized.entities))
			// Sanitize admin user
			const adminUser = { ...response.adminUser }
			delete adminUser.applications
			delete adminUser.fbPages
			return dispatch(receiveAdmin(adminUser))
		})
	}
}

export const logOut = () => {
	return dispatch => {
		Cookies.remove('api_key')
		top.location.href = '/'
	}
}

export const updateInfo = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAdmin())
		const formData = getState().form.adminUserProfile.values
		const body = {
			admin_user: formData
		}
		patchToApi(
			`admin_users/${getState().admin.id}.json`, 
			body
		).then( response => {
			dispatch(receiveAdmin(response))
			dispatch(toggleActivityUpdatingAdmin())
		})
	}
}