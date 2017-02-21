import { fetchImages } from 'canvas/trivia/actions/images'
import { fetchMessages } from 'canvas/trivia/actions/messages'
import { fetchSettings } from 'canvas/trivia/actions/settings'
import { toggleCountDown } from 'canvas/trivia/actions/countDown'

export const getStaticContent = (nextState, replace, next, dispatch) => dispatch(fetchSettings())
						.then(() => dispatch(fetchMessages()))
						.then(() => dispatch(fetchImages()))
						.then(() => {
							// if (json.intro == null) {
								// dispatch(push(`/${canvasId}/${checksum}/scores`))
							// }
							return next()
						})

export const startTimer = (nextState, replace, next, dispatch) => {
	// return dispatch(toggleCountDown())
	// 	.then(() => {
	// 		next()
	// 	}
	// )
	dispatch(toggleCountDown())
	return next()
}