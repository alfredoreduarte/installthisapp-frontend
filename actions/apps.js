import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as CONFIG from 'config.dev'
import { receiveEntities } from 'actions/entities'

export const deleteApp = checksum => ({
	type: 'DELETE_APP',
	checksum
})

export const postDeleteApp = () => {
	return (dispatch, getState) => {
		const checksum = getState().deleteApp.checksum
		// const url = CONFIG.BASE_URL + `/apps/delete/${checksum}`
		const url = `/apps/delete/${checksum}`
		return 	fetch(url)
				.then(response => response.json())
				.then(json =>{
					console.log('se borro', json)
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}

export const postNewApp = () => {
	// const url = CONFIG.BASE_URL + '/apps/create'
	const url = '/apps/create'
	return (dispatch, getState) => {
		const newAppData = getState().newApp
		return fetch(url, {
					method: 'POST',
					body: newAppData
				})
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.app)
					dispatch(receiveEntities(normalized.entities))
				})
				.catch(exception =>
					console.log('postNewApp: parsing failed', exception)
				)
	}
}