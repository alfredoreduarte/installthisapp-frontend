import { fetchImages } from 'canvas/trivia/actions/images'
import { fetchMessages } from 'canvas/trivia/actions/messages'
import { fetchSettings } from 'canvas/trivia/actions/settings'
import { toggleCountDown } from 'canvas/trivia/actions/countDown'

export const getStaticContent = (nextState, replace, next, dispatch) => 
						dispatch(fetchSettings())
						.then(() => dispatch(fetchMessages()))
						.then(() => dispatch(fetchImages()))
						.then(next())

// Sería bueno que haya una forma de saber si ya bajamos settings, imágenes y mensajes,
// para usarlos en visitas directas a páginas internas
// Pero actualmente no hay manera. NextState no trae ese dato
export const getStaticContentIfItDoesntExist = (nextState, replace, next, dispatch) => {
	console.log('nextState puto')
	console.log(nextState)
	if (false) {
		return dispatch(fetchSettings())
			.then(() => dispatch(fetchMessages()))
			.then(() => dispatch(fetchImages()))
			.then(next())
	}
}

export const startTimer = (nextState, replace, next, dispatch) => {
	// return dispatch(toggleCountDown())
	// 	.then(() => {
	// 		next()
	// 	}
	// )
	dispatch(toggleCountDown())
	return next()
}