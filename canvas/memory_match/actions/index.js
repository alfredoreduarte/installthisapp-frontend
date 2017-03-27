import { fetchImages } from 'canvas/memory_match/actions/images'
import { fetchMessages } from 'canvas/memory_match/actions/messages'
import { fetchEntities } from 'canvas/memory_match/actions/entities'

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