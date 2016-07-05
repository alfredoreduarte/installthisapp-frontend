import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from './schema'
import data from '../data'

const receiveAdmin = json => {
	return {
		type: 'RECEIVE_ADMIN',
		payload: json
	}
}

const receiveApps = ({ entities }) => {
	return {
		type: 'RECEIVE_APPS',
		entities
	}
}

export const selectUser = id => {
	return {
		type: 'SELECT_USER',
		id
	}
}

export const sortUsersBy = key => {
	return {
		type: 'SORT_USERS',
		payload: key
	}
}

export const sortAppsBy = key => {
	return {
		type: 'SORT_APPS',
		payload: key
	}
}

export const searchText = payload => {
	return {
		type: 'SEARCH_TEXT',
		payload
	}
}

export function fetchAdminMock(){
	const url = 'http://rest.learncode.academy/api/wstern/users';
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(data, {
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