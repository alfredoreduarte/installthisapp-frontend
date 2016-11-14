import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { push } from 'react-router-redux'
import { receiveEntities } from 'actions/entities'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivityUpdatingAppSettings } from 'actions/activityIndicators'
import { receiveAdmin } from 'actions/admin'
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

export const destroy = checksum => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		deleteFromApi(`applications/${checksum}.json`, null, res => {
			dispatch(updateApp(checksum, res))
			dispatch(push('/d'))
		})
	}
}

export const install = checksum => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		analytics.track('App Installed', {
			appType: currentApp.applicationType,
		})
		return postToApi(`applications/${checksum}/install.json`, null, res => dispatch(updateApp(checksum, res)))
	}
}

export const uninstall = checksum => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		postToApi(`applications/${checksum}/uninstall.json`, null, res => dispatch(updateApp(checksum, res)))
	}
}

export const getStatsSummary = checksum => {
	return dispatch => 
		getFromApi(`applications/${checksum}/stats_summary.json`)
		.then(res => dispatch(updateApp(checksum, res)))
}

export const updateApp = (checksum, payload) => {
	return {
		type: 'UPDATE_APP',
		checksum,
		payload
	}
}

export const update = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAppSettings())
		const currentAppChecksum = getState().admin.currentApp
		patchToApi(
			`applications/${currentAppChecksum}.json`, 
			{
				application: getState().form.appPreferences.values
			}
		).then(response => {
			dispatch(updateApp(currentAppChecksum, response))
			dispatch(toggleActivityUpdatingAppSettings())
		})
	}
}

export const updateAppSpecificSettings = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAppSettings())
		const currentAppChecksum = getState().admin.currentApp
		// ignoredUserIdentifiers must ALWAYS be an array
		const setting = getState().form.appSpecificSettings.values
		if (setting.ignoredUserIdentifiers && setting.ignoredUserIdentifiers.length > 0) {
			setting.ignoredUserIdentifiers = setting.ignoredUserIdentifiers.split(",").map(Number)
		}
		if (setting.ignoredUserIdentifiers == "") {
			setting.ignoredUserIdentifiers = []
		}
		console.log('ignored')
		console.log(setting.ignoredUserIdentifiers)
		postToApi(
			`applications/${currentAppChecksum}/update_setting.json`, 
			{
				setting
			}
		).then(response => {
			dispatch(updateApp(currentAppChecksum, response))
			dispatch(toggleActivityUpdatingAppSettings())
		})
	}
}

const digestDataBeforePostingNewApp = data => {
	return {
		application: {
			// fb_page_id: data.pageId,
			application_type: data.module,
			title: data.title,
		},
		initial_stylesheet: data.stylesheet
	}
}

export const postNewApp = () => {
	return (dispatch, getState) => {
		const body = getState().newApp
		analytics.track('App Created', {
			appType: body.module,
		})
		const params = digestDataBeforePostingNewApp(body)
		const defaultMessages = JSON.stringify(require(`modules/${params.application.application_type}/messages`).default)
		const defaultImages = JSON.stringify(require(`modules/${params.application.application_type}/images`).default)
		const defaultStyles = require(`!css!sass!../assets/canvas/${params.application.application_type}.sass`).toString()
		postToApi('applications.json', {
			...params, 
			...{
				initial_messages_json: defaultMessages,
				initial_images_json: defaultImages,
				initial_styles: defaultStyles,
			} 
		}, response => {
			if (response.success) {
				console.log('el! response')
				console.log(response)
				const normalized = normalize(response.app, schema.app)
				console.log(normalized)
				dispatch(receiveEntities(normalized.entities))
				dispatch(push(`/d/apps/${response.app.applicationType}/${response.app.checksum}/setup-guide`))
				// Commented out because we actually have to wait for the js chunk to download 
				// Moved to containers/AppDashboardContainer.js
				// dispatch({
				// 	type: 'TOGGLE_ACTIVITY/CREATING_APP'
				// })
			}
			else{
				console.log(response.message)
			}
		})
	}
}

export const installFacebookTab = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'TOGGLE_ACTIVITY/INSTALLING_TAB'
		})
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const fbPageIdentifierForIntegration = state.admin.fbPageIdentifierForIntegration
		analytics.track('Feature Used', {
			featureType: 'Facebook Tab',
		})
		analytics.track('Tab Installed')
		return postToApi(`applications/${currentApp.checksum}/install_tab.json`, {
			fbPageIdentifier: fbPageIdentifierForIntegration
		}).then(response => {
			dispatch({
				type: 'TOGGLE_ACTIVITY/INSTALLING_TAB'
			})
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

export const uninstallFacebookTab = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'TOGGLE_ACTIVITY/INSTALLING_TAB'
		})
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		// postToApi(`applications/${currentApp.checksum}/uninstall_tab.json`, null, res => dispatch(updateApp(currentApp.checksum, res)))
		postToApi(`applications/${currentApp.checksum}/uninstall_tab.json`, null)
		.then(response => {
			const entities = {
				apps: response.applications,
				pages: response.pages,
			}
			dispatch({
				type: 'TOGGLE_ACTIVITY/INSTALLING_TAB'
			})
			const normalized = normalize(entities, schema.entities)
			dispatch(receiveEntities(normalized.entities))
			// Sanitize admin user
			const admin = { ...response }
			delete admin.applications
			delete admin.pages
			return dispatch(receiveAdmin(admin))
		})
		// , res => dispatch(updateApp(currentApp.checksum, res)))
	}
}