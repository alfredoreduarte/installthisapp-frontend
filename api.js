import 'isomorphic-fetch'
import Cookies from 'js-cookie'
import humps from 'humps'
// import { API_URL } from 'config'
// const API_URL = process.env.API_URL
const API_URL = window.apiUrl

const processBody = body => body ? JSON.stringify(humps.decamelizeKeys(body)) : null
const processResponse = res => humps.camelizeKeys(res)

const temporaryEmptyFunction = arg => {
	console.log('temporaryEmptyFunction')
}

export const getFromApi = (endpoint, success = temporaryEmptyFunction) => {
	const api_key = Cookies.get('api_key')
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
				success(processResponse(json))
				return Promise.resolve(json)
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const patchToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const api_key = Cookies.get('api_key')
	return 	fetch(API_URL + '/' + endpoint, {
				method: 'PATCH',
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
				success(processResponse(json))
				return Promise.resolve()
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const postToApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const api_key = Cookies.get('api_key')
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
				success(processResponse(json))
				return Promise.resolve()
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}

export const deleteFromApi = (endpoint, body = null, success = temporaryEmptyFunction) => {
	const api_key = Cookies.get('api_key')
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
				success(processResponse(json))
				return Promise.resolve()
			})
			.catch(exception =>
				console.log('parsing failed', exception)
			)
}