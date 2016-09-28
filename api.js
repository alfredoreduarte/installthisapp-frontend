import 'isomorphic-fetch'
import Cookies from 'js-cookie'
import humps from 'humps'
import { API_URL } from 'config'

const apiKey = Cookies.get('api_key')

const processBody = body => body ? JSON.stringify(humps.decamelizeKeys(body)) : null
const processResponse = res => humps.camelizeKeys(res)

const temporaryEmptyFunction = arg => console.log('temporaryEmptyFunction')

const processUnauthorized = () => {
	console.log('Not authorized')
	top.location.href = '/'
	return true
}

export const getFromApi = (endpoint, success = temporaryEmptyFunction) => {
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'GET',
				headers: {
					'Authorization': `Token token="${apiKey}"`,
					'Content-Type': `application/json`,
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
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const patchToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'PATCH',
				headers: {
					'Authorization': `Token token="${apiKey}"`,
					'Content-Type': `application/json`,
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
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Authorization': `Token token="${apiKey}"`,
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
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'POST',
				headers: {
					'Authorization': `Token token="${apiKey}"`,
					'Content-Type': `application/json`,
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
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'DELETE',
				headers: {
					'Authorization': `Token token="${apiKey}"`,
					'Content-Type': `application/json`,
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
			.then(json => {
				const response = processResponse(json)
				success(response)
				return Promise.resolve(response)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}