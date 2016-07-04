import 'isomorphic-fetch'
import data from '../data'

const receiveAdminData = (json) => {
	return {
		type: 'RECEIVE_ADMIN',
		payload: json
	}
}

const receiveAppsData = (json) => {
	return {
		type: 'RECEIVE_APPS',
		payload: json
	}
}

export function fetchAdminMock(){
	const url = 'http://rest.learncode.academy/api/wstern/users';
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					dispatch(receiveAdminData(data.adminUser))
					dispatch(receiveAppsData(data.apps))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}