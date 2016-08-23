import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { push } from 'react-router-redux'
import { receiveEntities } from 'actions/entities'
import humps from 'humps'
import { readFromApi, writeToApi, deleteFromApi } from 'api'

export const deleteApp = checksum => ({
	type: 'DELETE_APP',
	checksum
})

export const toggleAppInstalling = checksum => ({
	type: 'INSTALLING_APP',
	checksum
})

export const toggleAppUninstalling = checksum => ({
	type: 'UNINSTALLING_APP',
	checksum
})

export const toggleAppInstalled = checksum => ({
	type: 'INSTALL_APP',
	checksum
})

export const toggleAppUninstalled = checksum => ({
	type: 'UNINSTALL_APP',
	checksum
})

export const postDeleteApp = checksum => {
	return dispatch => {
		deleteFromApi(`applications/${checksum}.json`, null, response => console.log(response))
	}
}

export const install = checksum => {
	return dispatch => 
		writeToApi(`applications/${checksum}/install.json`, null, response => {
			const camelizedJson = humps.camelizeKeys(response)
			const normalized = normalize(camelizedJson, schema.entities)
			dispatch(receiveEntities(normalized.entities))
			dispatch(toggleAppInstalled(checksum))
		})
}

export const uninstall = checksum => {
	return dispatch => 
		writeToApi(`applications/${checksum}/uninstall.json`, null, response => {
			dispatch(toggleAppUninstalled(checksum))
		})
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
		writeToApi(`applications.json`, params, response => {
			const camelizedJson = humps.camelizeKeys(response)
			const normalized = normalize(camelizedJson, schema.app)
			dispatch(receiveEntities(normalized.entities))
			dispatch(push(`/d/apps/${camelizedJson.applicationType}/${camelizedJson.checksum}`))
			dispatch({
				type: 'TOGGLE_ACTIVITY/CREATING_APP'
			})
		})
	}
}