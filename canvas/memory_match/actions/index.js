import { push } from 'react-router-redux'
import { postToApi } from 'canvas/api'
import { fetchImages } from 'canvas/memory_match/actions/images'
import { fetchMessages } from 'canvas/memory_match/actions/messages'
import { fetchEntities } from 'canvas/memory_match/actions/entities'
import { stopTimer } from 'canvas/memory_match/actions/game'
import { getAllCards } from 'canvas/memory_match/selectors/cards'
import { startingTimeInUnixSeconds, currentTimeInUnixSeconds } from 'canvas/memory_match/selectors/time'

export const getStaticContent = (nextState, replace, next, dispatch) => dispatch(fetchMessages())
																		.then(() => dispatch(fetchImages()))
																		.then(() => next())

export const getStaticContentAndEntities = (nextState, replace, next, dispatch) => dispatch(fetchMessages())
																		.then(() => dispatch(fetchImages()))
																		.then(() => {
																			console.log('llega')
																			dispatch(fetchEntities())
																		})
																		.then(() => next())

export const loginCallback = () => {
	return dispatch => dispatch( fetchEntities() )
	.then( () => dispatch(fetchImages()) )
	.then( () => dispatch(fetchMessages()) )
}

export const checkIfGameFinished = () => {
	return (dispatch, getState) => {
		const state = getState()
		const matchedIdsLength = state.game.matchedIds.length
		const cardsLength = getAllCards(state).length
		if (matchedIdsLength == cardsLength) {
			// Game finished
			dispatch(stopTimer())
			dispatch({
				type: 'FINISH_GAME'
			})
			return dispatch(postResults())
		}
	}
}

export const postResults = () => {
	return (dispatch, getState) => {
		const checksum = getState().applicationData.checksum
		const clicks = getState().game.clickCount
		const startingTime = startingTimeInUnixSeconds(getState())
		const finishTime = currentTimeInUnixSeconds(getState())
		return postToApi(`${checksum}/entries_create.json`, {
			entry: {
				clicks,
				startingTime,
				finishTime,
			}
		}).then(response => {
			if (response.success) {
				// return dispatch(push(`/${window.canvasId}/${window.checksum}/thanks`))
				return dispatch(push(`/memory_match/${window.checksum}/thanks`))
			}
			else{
				console.log(response)
			}
		})
	}
}