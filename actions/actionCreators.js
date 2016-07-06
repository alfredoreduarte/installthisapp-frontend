import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'schema'
import * as CONFIG from 'config.dev'

const receiveAdmin = json => ({
	type: 'RECEIVE_ADMIN',
	payload: json
})

const receiveApps = ({ entities }) => ({
	type: 'RECEIVE_APPS',
	entities
})

export const sortAppsBy = key => ({
	type: 'SORT_APPS',
	payload: key
})

export const fetchAdminMock = () => {
	const url = CONFIG.BASE_URL + '/admindata'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, {
						apps: arrayOf(schema.app),
						pages: arrayOf(schema.page)
					})
					dispatch(receiveAdmin(normalized.result.admin))
					dispatch(receiveApps(normalized))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}