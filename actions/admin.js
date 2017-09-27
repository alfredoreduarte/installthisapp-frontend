import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { push } from 'react-router-redux'
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
	let dataForSegment = { 
		email: payload.email,
		created_at: payload.createdAt,
	}
	if (payload.name) {
		dataForSegment = {
			...dataForSegment,
			name: payload.name,
		}
	}
	if (payload.confirmedAt) {
		dataForSegment = {
			...dataForSegment,
			confirmed_at: payload.confirmedAt,
		}
	}
	analytics.identify(payload.id, dataForSegment)
	// 
	// Profitwell
	// 
	profitwell('user_email', payload.email)
}

export const fetchAdmin = () => {
	return (dispatch, getState) => {
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
			// 
			// Mandatory "complete your profile" for profiles with no names
			// 
			if (!admin.name) {
				if (getState().routing.locationBeforeTransitions.pathname != '/d/complete-profile') {
					setTimeout(() => {
						top.location.href = '/d/complete-profile'
					}, 300)
				}
			}
			else {
				if (getState().routing.locationBeforeTransitions.pathname == '/d/complete-profile') {
					top.location.href = '/d'
				}
			}
			return dispatch(receiveAdmin(admin))
		})
	}
}

export const logOut = () => {
	return dispatch => {
		// /auth/sign_out
		Cookies.remove('access-token')
		Cookies.remove('uid')
		Cookies.remove('client')
		Cookies.remove('token-type')
		// top.location.href = '/'
		deleteFromApi(
			'auth/sign_out.json'
		).then( response => {
			top.location.href = '/'
		})
	}
}

export const resendEmailConfirmation = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAdmin())
		return postToApi(
			`admins/resend_email_confirmation.json`
		).then( response => {
			dispatch(receiveAdmin(response))
			dispatch(toggleActivityUpdatingAdmin())
		})
	}
}

export const updateInfo = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAdmin())
		const formData = getState().form.adminUserProfile.values
		return patchToApi(
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