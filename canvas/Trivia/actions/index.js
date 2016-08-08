import 'isomorphic-fetch'
import { normalize, arrayOf } from 'normalizr'
import * as schema from 'canvas/Trivia/schema'
import * as CONFIG from 'config.dev'
import humps from 'humps'


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

export const fetchEntities = checksum => {
	const url = `https://local.installthisapp.com/${checksum}/canvas_entities.json`
	return dispatch => {
		return fetch(url, {
					method: 'GET',
					headers: {
						'Authorization': `Token token="${window.canvasApiKey}"`,
					}
				})
				.then(response => response.json())
				.then(json =>{
					if (json.status == 'ok') {
						const camelizedJson = humps.camelizeKeys(json)
						const normalized = normalize(camelizedJson, schema.entities)
						dispatch(receiveEntities(normalized.entities))
						dispatch(receiveGameSettings(camelizedJson.settings))
						dispatch(toggleActivityIndicator())
						dispatch(toggleCountDown())
					}
					else{
						console.log('already answered all questions')
					}
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}

export const saveAnswer = (questionId, optionId, correct) =>{
	return {
		type: 'SAVE_ANSWER',
		payload: {
			questionId,
			optionId,
			correct
		}
	}
}

export const postAnswers = () => {
	return (dispatch, getState) => {
		const body = {
			answers: getState().answers
		}
		const checksum = getState().settings.checksum
		const url = `https://local.installthisapp.com/${checksum}/save.json`
		return fetch(url, {
					method: 'POST',
					headers: {
						'Authorization': `Token token="${window.canvasApiKey}"`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body)
				})
				.then(response => response.json())
				.then(json =>{
					// const normalized = normalize(json, schema.entities)
					console.log('answers posted and received', json)
					// dispatch(receiveEntities(normalized.entities))
					// dispatch(receiveGameSettings(json.settings))
				})
				.catch(exception =>
					console.log('parsing failed', exception)
				)
	}
}