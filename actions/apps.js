import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import _ from 'lodash'
import { setAlert } from 'actions/alerts'
import { push } from 'react-router-redux'
import { receiveEntities } from 'actions/entities'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivityUpdatingApp } from 'actions/activityIndicators'
import { receiveAdmin } from 'actions/admin'
import { getFromApi, postToApi, deleteFromApi, patchToApi } from 'api'

export const setCurrentAppChecksum = checksum => {
	return dispatch => {
		dispatch({
			type: 'SET_CURRENT_APP',
			checksum,
		})
		return Promise.resolve()
	}
}

export const toggleAppCancelInstallation = checksum => ({
	type: 'CANCEL_INSTALLING_APP',
	checksum,
})

export const toggleAppInstalling = checksum => ({
	type: 'INSTALLING_APP',
	checksum,
})

export const toggleAppUninstalling = checksum => ({
	type: 'UNINSTALLING_APP',
	checksum,
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
		postToApi(`applications/${checksum}/install.json`, null, response => {
			if (response.success) {
				analytics.track('App Installed', {
					appType: currentApp.applicationType,
				})
				return dispatch(updateApp(checksum, response.application))
			} else {
				dispatch(toggleAppCancelInstallation(checksum))
				dispatch(
					setAlert(
						`<a href="?offer=app-limit-reached">Upgrade now to publish apps</a>.`,
						`You have reached the limit for free accounts.`
					)
				)
			}
		})
	}
}

export const uninstall = checksum => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		postToApi(`applications/${checksum}/uninstall.json`, null, res => dispatch(updateApp(checksum, res)))
	}
}

export const getStatsSummary = checksum => {
	return dispatch => getFromApi(`applications/${checksum}/stats_summary.json`).then(res => dispatch(updateApp(checksum, res)))
}

export const updateApp = (checksum, payload) => {
	return {
		type: 'UPDATE_APP',
		checksum,
		payload,
	}
}

export const update = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingApp())
		const currentAppChecksum = getState().admin.currentApp
		return patchToApi(`applications/${currentAppChecksum}.json`, {
			application: getState().form.appPreferences.values,
		}).then(response => {
			dispatch(updateApp(currentAppChecksum, response))
			// const normalized = normalize(response, schema.app)
			// dispatch(receiveEntities(normalized.entities))
			dispatch(toggleActivityUpdatingApp())
		})
	}
}

export const updateAppSettings = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		return postToApi(`applications/${currentApp.checksum}/update_setting.json`, {
			setting: currentApp.setting,
		}).then(response => {
			if (response.success) {
				// const normalized = normalize(response, schema.app)
				// dispatch(receiveEntities(normalized.entities))
				dispatch({
					type: 'UPDATE_APP_SETTING',
					checksum: currentApp.checksum,
					payload: response.app.setting,
				})
			} else {
				console.log(response.message)
			}
		})
	}
}

const handleTopFansEdgeCase = setting => {
	//
	// TOP FANS ONLY
	// ignoredUserIdentifiers must ALWAYS be an array
	if (setting.ignoredUserIdentifiers) {
		if (setting.ignoredUserIdentifiers && setting.ignoredUserIdentifiers.length > 0) {
			setting.ignoredUserIdentifiers = _.split(setting.ignoredUserIdentifiers, ',').map(Number)
		}
		if (setting.ignoredUserIdentifiers == '') {
			setting.ignoredUserIdentifiers = []
		}
	}
	return setting
}

export const updateAppSpecificSettings = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingApp())
		const currentAppChecksum = getState().admin.currentApp
		const rawSettings = getState().form.appSpecificSettings.values
		const setting = handleTopFansEdgeCase(rawSettings)
		postToApi(`applications/${currentAppChecksum}/update_setting.json`, { setting }).then(response => {
			if (response.success) {
				dispatch({
					type: 'UPDATE_APP_SETTING',
					checksum: currentAppChecksum,
					payload: response.app.setting,
				})
			}
			dispatch(toggleActivityUpdatingApp())
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
		initial_stylesheet: data.stylesheet,
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
		const defaultStyles = require(`!css-loader!sass-loader!../assets/canvas/${params.application.application_type}.sass`).toString()
		postToApi(
			'applications.json',
			{
				...params,
				...{
					initial_messages_json: defaultMessages,
					initial_images_json: defaultImages,
					initial_styles: defaultStyles,
				},
			},
			response => {
				if (response.success) {
					const normalized = normalize(response.app, schema.app)
					dispatch(receiveEntities(normalized.entities))
					//
					// Wizard (setup-guide) solamente para top fans
					//
					if (body.module == 'top_fans') {
						dispatch(push(`/d/apps/${response.app.applicationType}/${response.app.checksum}/setup-guide`))
					} else if (
						body.module == 'form' ||
						body.module == 'fan_gate' ||
						body.module == 'coupons' ||
						body.module == 'photo_contest' ||
						body.module == 'capture_the_flag' ||
						body.module == 'static_html' ||
						body.module == 'promo_code'
					) {
						dispatch(push(`/d/apps/${response.app.applicationType}/${response.app.checksum}/editor`))
					} else {
						dispatch(push(`/d/apps/${response.app.applicationType}/${response.app.checksum}`))
					}
					// Commented out because we actually have to wait for the js chunk to download
					// Moved to containers/AppDashboardContainer.js
					// dispatch({
					// 	type: 'TOGGLE_ACTIVITY/CREATING_APP'
					// })
				} else {
					dispatch(
						setAlert(
							`<a href="/d/upgrade">Please upgrade your account</a>.`,
							`You have reached the app limit for free accounts.`
						)
					)
					console.log(response.message)
				}
			}
		)
	}
}

export const installFacebookTab = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'TOGGLE_ACTIVITY/INSTALLING_TAB',
		})
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const fbPageIdentifierForIntegration = state.admin.fbPageIdentifierForIntegration
		return postToApi(`applications/${currentApp.checksum}/install_tab.json`, {
			fbPageIdentifier: fbPageIdentifierForIntegration,
		})
			.then(response => {
				if (response.success == false) {
					window.scroll(0, 0)
					dispatch(
						setAlert(
							`<a href="?offer=app-limit-reached">Upgrade now to publish apps</a>.`,
							`You have reached the limit for free accounts.`
						)
					)
					return false
				} else {
					analytics.track('Tab Installed')
					dispatch({
						type: 'TOGGLE_ACTIVITY/INSTALLING_TAB',
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
				}
			})
			.catch(exception => {
				console.log('parsing failed', exception)
				dispatch({
					type: 'TOGGLE_ACTIVITY/INSTALLING_TAB',
				})
				dispatch(setAlert(`Error`, `Unexpected error. Please contact support.`))
			})
	}
}

export const uninstallFacebookTab = () => {
	return (dispatch, getState) => {
		dispatch({
			type: 'TOGGLE_ACTIVITY/INSTALLING_TAB',
		})
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		// postToApi(`applications/${currentApp.checksum}/uninstall_tab.json`, null, res => dispatch(updateApp(currentApp.checksum, res)))
		postToApi(`applications/${currentApp.checksum}/uninstall_tab.json`, null).then(response => {
			const entities = {
				apps: response.applications,
				pages: response.pages,
			}
			dispatch({
				type: 'TOGGLE_ACTIVITY/INSTALLING_TAB',
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
