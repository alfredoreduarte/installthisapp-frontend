import 'isomorphic-fetch'
import Cookies from 'js-cookie'
import humps from 'humps'
import { API_URL } from 'config'
import simulateDelay from 'lib/networkDelay'

// 
// Gets the client user id for super-admin godview
// 
const spy = window.alias
//
const apiKey = Cookies.get('api_key')

const processBody = body => body ? JSON.stringify(humps.decamelizeKeys(body)) : null
const processResponse = res => humps.camelizeKeys(res)

const temporaryEmptyFunction = arg => console.log('temporaryEmptyFunction')

const processUnauthorized = () => {
	console.log('Not authorized')
	top.location.href = '/'
	return true
}

const getAuthKeys = () => {
	return {
		'access-token': Cookies.get('access-token'),
		'token-type': Cookies.get('token-type'),
		'uid': Cookies.get('uid'),
		'client': Cookies.get('client'),
	}
}

export const getFromApi = (endpoint, success = temporaryEmptyFunction) => {
	const authKeys = getAuthKeys()
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'spy-user': spy,
					'Content-Type': 'application/json',
					...authKeys,
				}
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401: processUnauthorized()
					default:
						console.log('Status: ' + response.status)
						// top.location.href = '/'
						return
				}
			})
			.then(json => simulateDelay(json))
			.then(json => {
				const response = processResponse(json)
				console.log('res')
				console.log(response)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const patchToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const authKeys = getAuthKeys()
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'spy-user': spy,
					'Content-Type': 'application/json',
					...authKeys,
				},
				body: processBody(body),
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401: processUnauthorized()
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => simulateDelay(json))
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const postFileToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const authKeys = getAuthKeys()
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'spy-user': spy,
					...authKeys,
				},
				body: body,
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401: processUnauthorized()
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => simulateDelay(json))
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const postToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const authKeys = getAuthKeys()
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'spy-user': spy,
					'Content-Type': 'application/json',
					...authKeys,
				},
				body: processBody(body),
			})
			.then(response => {
				console.log('response')
				console.log(response)
				switch(response.status){
					case 200:
						return response.json()
					case 401: processUnauthorized()
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => simulateDelay(json))
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const deleteFromApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const authKeys = getAuthKeys()
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'spy-user': spy,
					'Content-Type': 'application/json',
					...authKeys,
				},
				body: processBody(body),
			})
			.then(response => {
				switch(response.status){
					case 200:
						return response.json()
					case 401: processUnauthorized()
					default:
						console.log('Status: ' + response.status)
						return
				}
			})
			.then(json => simulateDelay(json))
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}