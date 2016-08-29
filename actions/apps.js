import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { push } from 'react-router-redux'
import { receiveEntities } from 'actions/entities'
import { toggleActivityUpdatingAppSettings } from 'actions/activityIndicators'
import { getFromApi, postToApi, deleteFromApi, patchToApi } from 'api'

export const setCurrentAppChecksum = checksum => {
	return dispatch => {
		dispatch({
			type: 'SET_CURRENT_APP',
			checksum
		})
		return Promise.resolve()
	}
}

export const toggleAppInstalling = checksum => ({
	type: 'INSTALLING_APP',
	checksum
})

export const toggleAppUninstalling = checksum => ({
	type: 'UNINSTALLING_APP',
	checksum
})

export const updateApp = (checksum, payload) => {
	return {
		type: 'UPDATE_APP',
		checksum,
		payload
	}
}

export const destroy = checksum => {
	return dispatch => {
		deleteFromApi(`applications/${checksum}.json`, null, res => {
			dispatch(updateApp(checksum, res))
			dispatch(push('/d'))
		})
	}
}

export const install = checksum => {
	return dispatch => 
		postToApi(`applications/${checksum}/install.json`, null, res => dispatch(updateApp(checksum, res)))
}

export const uninstall = checksum => {
	return dispatch => 
		postToApi(`applications/${checksum}/uninstall.json`, null, res => dispatch(updateApp(checksum, res)))
}

export const update = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAppSettings())
		const body = {
			application: getState().form.appPreferences.values
		}
		patchToApi(
			`applications/${getState().admin.currentApp}.json`, 
			body, 
			res => {
				dispatch(updateApp(getState().admin.currentApp, res))
				dispatch(toggleActivityUpdatingAppSettings())
			}
		)
	}
}

const digestDataBeforePostingNewApp = data => {
	return {
		application: {
			facebook_page_identifier: data.pageId,
			application_type: data.module,
			title: data.title,
		}
	}
}

export const postNewApp = () => {
	return (dispatch, getState) => {
		const params = digestDataBeforePostingNewApp(getState().newApp)
		postToApi(`applications.json`, params, res => {
			const normalized = normalize(res, schema.app)
			dispatch(receiveEntities(normalized.entities))
			dispatch(push(`/d/apps/${res.applicationType}/${res.checksum}`))
			// Commented out because we actually have to wait for the js chunk to download 
			// Moved to containers/AppDashboardContainer.js
			// dispatch({
			// 	type: 'TOGGLE_ACTIVITY/CREATING_APP'
			// })
		})
	}
}