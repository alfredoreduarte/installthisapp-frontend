import 'isomorphic-fetch'
import * as CONFIG from 'config.dev'
import Cookies from 'js-cookie'

export const receiveAdmin = json => ({
	type: 'RECEIVE_ADMIN',
	payload: json
})

export const fetchAdmin = () => {
	const url = CONFIG.BASE_URL + '/admin_users.json'
	const api_key = Cookies.get('api_key')
	return dispatch => {
		return 	fetch(url, {
					method: 'GET',
					headers: {
						'Authorization': `Token token="${api_key}"`,
						// 'Accept': 'application/json',
						// 'Content-Type': 'application/json'
					}
				})
				.then(response => response.json())
				.then(json =>{
					dispatch(receiveAdmin(json))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}