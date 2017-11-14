import { fetchImages } from 'canvas/example/actions/images'
import { fetchMessages } from 'canvas/example/actions/messages'
import { fetchEntities } from 'canvas/example/actions/entities'
import { fetchSettings } from 'canvas/example/actions/settings'

export const getStaticContent = (nextState, replace, next, dispatch) =>
	dispatch(fetchMessages())
		.then(() => dispatch(fetchImages()))
		.then(() => dispatch(fetchSettings()))
		.then(() => next())

export const getStaticContentAndEntities = (nextState, replace, next, dispatch) =>
	dispatch(fetchMessages())
		.then(() => dispatch(fetchImages()))
		.then(() => dispatch(fetchSettings()))
		.then(() => dispatch(fetchEntities()))
		.then(() => next())

export const loginCallback = () => {
	return dispatch =>
		dispatch(fetchEntities())
			.then(() => dispatch(fetchImages()))
			.then(() => dispatch(fetchSettings()))
			.then(() => dispatch(fetchMessages()))
}
