import { fetchImages } from 'canvas/capture_the_flag/actions/images'
import { fetchMessages } from 'canvas/capture_the_flag/actions/messages'
import { fetchEntities } from 'canvas/capture_the_flag/actions/entities'
import { fetchSettings } from 'canvas/capture_the_flag/actions/settings'

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
