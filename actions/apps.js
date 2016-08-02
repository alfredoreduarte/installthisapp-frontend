import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import { push } from 'react-router-redux'
import * as CONFIG from 'config.dev'
import { receiveEntities } from 'actions/entities'
import Cookies from 'js-cookie'
import humps from 'humps'

export const deleteApp = checksum => ({
	type: 'DELETE_APP',
	checksum
})

export const postDeleteApp = checksum => {
	return (dispatch, getState) => {
		const api_key = Cookies.get('api_key')
		const url = CONFIG.BASE_URL + `/applications/${checksum}.json`
		return 	fetch(url, {
					method: 'DELETE',
					headers: {
						'Authorization': `Token token="${api_key}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					console.log('se borro', json)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const install = checksum => {
	return (dispatch, getState) => {
		const api_key = Cookies.get('api_key')
		const url = CONFIG.BASE_URL + `/applications/${checksum}/install.json`
		return 	fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					console.log('se instalo?', json)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const uninstall = checksum => {
	return (dispatch, getState) => {
		const api_key = Cookies.get('api_key')
		const url = CONFIG.BASE_URL + `/applications/${checksum}/uninstall.json`
		return 	fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					console.log('se desinstalo?', json)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const postNewApp = () => {
	const url = CONFIG.BASE_URL + '/applications.json'
	const api_key = Cookies.get('api_key')
	console.log('create app request')
	return (dispatch, getState) => {
		const newAppData = getState().newApp
		const params = {
			application: {
				facebook_page_identifier: newAppData.pageId,
				application_type: newAppData.module,
				title: newAppData.title,
			}
		}
		return fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(params),
				})
				.then(response => response.json())
				.then(json =>{
					console.log(json)
					const camelizedJson = humps.camelizeKeys(json)
					const normalized = normalize(camelizedJson, schema.app)
					dispatch(receiveEntities(normalized.entities))
					dispatch(push(`/apps/${camelizedJson.applicationType}/${camelizedJson.checksum}`))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}