import { fetchImages } from 'canvas/catalog/actions/images'
import { fetchMessages } from 'canvas/catalog/actions/messages'
import { fetchEntities } from 'canvas/catalog/actions/entities'
import { fetchSettings } from 'canvas/catalog/actions/settings'

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
	.then( () => dispatch(fetchMessages()) )
}

