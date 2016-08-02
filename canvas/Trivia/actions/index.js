import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'canvas/Trivia/schema'
import * as CONFIG from 'config.dev'


// 
export function advanceCountDown(){
	return {
		type: 'COUNTDOWN_PROGRESS'
	}
}

export function toggleActivityIndicator(){
	return {
		type: 'TOGGLE_ACTIVITY_INDICATOR'
	}
}

export function toggleCountDown(){
	return {
		type: 'TOGGLE_COUNTDOWN'
	}
}

export function answerQuestion(id){
	return {
		type: 'ANSWER_QUESTION',
		id
	}
}
// 

export const receiveEntities = entities => ({
	type: 'RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const receiveGameSettings = settings => ({
	type: 'RECEIVE_SETTINGS',
	settings,
})

export const setChecksum = checksum => ({
	type: 'SET_CHECKSUM',
	checksum,
})

export const fetchEntities = () => {
	const url = 'http://app1.installthisapp.local:4000/entities.trivia.canvas'
	// const url = CONFIG.BASE_URL + '/applications/'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					const normalized = normalize(json, schema.entities)
					dispatch(receiveEntities(normalized.entities))
					dispatch(receiveGameSettings(json.settings))
					dispatch(toggleActivityIndicator())
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const postAnswers = () => {
	const url = 'http://app1.installthisapp.local:4000/entities.trivia.canvas'
	// const url = CONFIG.BASE_URL + '/entities.trivia.canvas'
	return dispatch => {
		return fetch(url)
				.then(response => response.json())
				.then(json =>{
					// const normalized = normalize(json, schema.entities)
					console.log('answers posted and received')
					// dispatch(receiveEntities(normalized.entities))
					// dispatch(receiveGameSettings(json.settings))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}