import 'isomorphic-fetch'
import humps from 'humps'
import { API_URL } from 'config'

const processBody = body => body ? JSON.stringify(humps.decamelizeKeys(body)) : null
const processResponse = res => humps.camelizeKeys(res)

const temporaryEmptyFunction = arg => console.log('temporaryEmptyFunction')

export const getFromApi = (endpoint, success = temporaryEmptyFunction) => {
	const api_key = window.canvasApiKey
	return 	fetch(API_URL + '/' + endpoint, {
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
				const camelizedJson = humps.camelizeKeys(json)
				success(camelizedJson)
				return Promise.resolve(camelizedJson)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const writeToApiWithoutAuth = (endpoint, body = null, success = temporaryEmptyFunction) => {
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': `application/json`,
				},
				body: processBody(body),
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
			.then(json => {
				const camelizedJson = humps.camelizeKeys(json)
				success(camelizedJson)
				return Promise.resolve(camelizedJson)
			})
			.catch(exception => console.log('parsing failed', exception))
}

export const postToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const api_key = window.canvasApiKey
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Authorization': `Token token="${api_key}"`,
					'Content-Type': `application/json`,
				},
				body: processBody(body),
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
				const camelizedJson = humps.camelizeKeys(json)
				success(camelizedJson)
				return Promise.resolve(camelizedJson)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const deleteFromApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const api_key = window.canvasApiKey
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token token="${api_key}"`,
					'Content-Type': `application/json`,
				},
				body: processBody(body),
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
				const camelizedJson = humps.camelizeKeys(json)
				success(camelizedJson)
				return Promise.resolve(camelizedJson)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}