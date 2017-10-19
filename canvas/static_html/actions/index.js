import { fetchImages } from 'canvas/static_html/actions/images'
import { fetchMessages } from 'canvas/static_html/actions/messages'
import { fetchEntities } from 'canvas/static_html/actions/entities'
import { fetchSettings } from 'canvas/static_html/actions/settings'

export const getStaticContent = (nextState, replace, next, dispatch) => dispatch(fetchMessages())
																		.then(() => dispatch(fetchImages()))
																		.then(() => dispatch(fetchSettings()))
																		.then(() => next())

export const getStaticContentAndEntities = (nextState, replace, next, dispatch) => dispatch(fetchMessages())
																		.then(() => dispatch(fetchImages()))
																		.then(() => dispatch(fetchSettings()))
																		.then(() => dispatch(fetchEntities()))
																		.then(() => next())

export const loginCallback = () => {
	return dispatch => dispatch( fetchEntities() )
	.then( () => dispatch(fetchImages()) )
	.then(() => dispatch(fetchSettings()))
	.then( () => dispatch(fetchMessages()) )
}