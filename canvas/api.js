import 'isomorphic-fetch'
import { BASE_URL } from 'config'

export const readFromApi = (endpoint, success) => {
	const api_key = window.canvasApiKey
	return 	fetch(BASE_URL + '/' + endpoint, {
				method: 'GET',
				headers: {
					'Authorization': `Token token="${api_key}"`,
					'Content-Type': `application/json`,
				}
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401:
						console.log('Not authorized')
						// top.location.href = '/'
						return
					default:
						console.log('Status: ' + response.status)
						// top.location.href = '/'
						return
				}
			})
			.then(json => {
				success(json)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const writeToApiWithoutAuth = (endpoint, body = null, success) => {
	const bodyToSend = body ? JSON.stringify(body) : null
	return 	fetch(BASE_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': `application/json`,
				},
				body: bodyToSend,
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => success(json))
			.catch(exception => console.log('parsing failed', exception))
}

export const writeToApi = (endpoint, body = null, success) => {
	const api_key = window.canvasApiKey
	const bodyToSend = body ? JSON.stringify(body) : null
	return 	fetch(BASE_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Authorization': `Token token="${api_key}"`,
					'Content-Type': `application/json`,
				},
				body: bodyToSend,
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401:
						console.log('Not authorized')
						// top.location.href = '/'
						return
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => {
				success(json)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const deleteFromApi = (endpoint, body = null, success) => {
	const api_key = window.canvasApiKey
	const bodyToSend = body ? JSON.stringify(body) : null
	return 	fetch(BASE_URL + '/' + endpoint, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token token="${api_key}"`,
					'Content-Type': `application/json`,
				},
				body: bodyToSend,
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401:
						console.log('Not authorized')
						// top.location.href = '/'
						return
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => {
				success(json)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}