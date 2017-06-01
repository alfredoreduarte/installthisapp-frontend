/**
 * @flow
 */
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

const handleErrors = response => {
	if (!response.ok) {
		throw Error(response.statusText)
	}
	return response
}

export const getFromApi = (endpoint: string, success: () => mixed = temporaryEmptyFunction) => {
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
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const patchToApi = (endpoint: string, body: ?{}, success: () => mixed = temporaryEmptyFunction) => {
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

export const postFileToApi = (endpoint: string, body: string, success: () => mixed = temporaryEmptyFunction) => {
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

export const postToApi = (endpoint: string, body: ?{}, success: () => mixed = temporaryEmptyFunction, camelize: boolean = true) => {
	const authKeys = getAuthKeys()
	const elBody = camelize ? processBody(body) : JSON.stringify(body)
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'spy-user': spy,
					'Content-Type': 'application/json',
					...authKeys,
				},
				body: elBody,
			})
			.then(handleErrors)
			.then(response => response.json())
			// .then(response => {
			// 	switch(response.status){
			// 		case 200:
			// 			return response.json()
			// 		case 401: processUnauthorized()
			// 		default:
			// 			console.log('Status: ' + response.status)
			// 			return
			// 	}
			// })
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

export const deleteFromApi = (endpoint: string, body: ?{}, success: () => mixed = temporaryEmptyFunction) => {
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