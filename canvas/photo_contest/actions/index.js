import { fetchImages } from 'canvas/photo_contest/actions/images'
import { fetchMessages } from 'canvas/photo_contest/actions/messages'
import { fetchEntities } from 'canvas/photo_contest/actions/entities'
import { fetchSettings } from 'canvas/photo_contest/actions/settings'

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
