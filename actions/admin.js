import 'isomorphic-fetch'
import * as CONFIG from 'config.dev'

export const receiveAdmin = json => ({
	type: 'RECEIVE_ADMIN',
	payload: json
})

export const fetchAdmin = () => {
	// const url = CONFIG.BASE_URL + '/admin'
	const url = '/admin'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					dispatch(receiveAdmin(json))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}