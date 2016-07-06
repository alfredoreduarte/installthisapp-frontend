import 'isomorphic-fetch'
import * as CONFIG from 'config.dev'

export const receiveSingleApp = (id) => ({
	type: 'RECEIVE_SINGLE_APP',
	id
})

export const postNewApp = () =>{
	const url = CONFIG.BASE_URL + '/apps/create'
	return (dispatch, getState) => {
		const newAppData = getState().newApp
		return fetch(url, {
					method: 'POST',
					body: newAppData
				})
				.then(response => response.json())
				.then(json =>{
					dispatch(receiveSingleApp(json.id))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}