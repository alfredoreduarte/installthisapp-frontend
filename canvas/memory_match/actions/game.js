import { checkIfGameFinished } from 'canvas/memory_match/actions/'

const actualFlipCard = (flippedCardId, id) => {
	return dispatch => {
		dispatch({
			type: 'FLIP_CARD',
			flippedCardId,
			id,
		})
		return Promise.resolve()
	}
}

export const flipCard = (flippedCardId, id) => {
	return dispatch => {
		if (!timer) {
			dispatch(startTimer())
		}
		dispatch(actualFlipCard(flippedCardId, id)).then(() => {
			setTimeout(() => {
				dispatch(checkIfImageMatches())
			}, 600)
			setTimeout(() => {
				dispatch(checkIfGameFinished())
			}, 700)
			// dispatch(checkIfGameFinished())
		})
	}
}

const checkIfImageMatches = () => {
	return (dispatch, getState) => {
		const flippedCards = getState().game.flippedCards
		if (flippedCards.length == 2) {
			dispatch({
				type: 'RESET_CARDS'
			})
		}
	}
}

export const tickTime = () => ({
	type: 'TIMER_TICK',
})

let timer = null
export const startTimer = () => {
	return dispatch => {
		clearInterval(timer)
		timer = setInterval(() => dispatch(tickTime()), 1000)
	}
}

export const stopTimer = () => {
	clearInterval(timer)
	return { type: 'TIMER_STOP' }
}