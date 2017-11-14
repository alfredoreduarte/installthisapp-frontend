import { fetchImages } from 'canvas/promo_code/actions/images'
import { fetchMessages } from 'canvas/promo_code/actions/messages'
import { fetchEntities } from 'canvas/promo_code/actions/entities'
import { fetchSettings } from 'canvas/promo_code/actions/settings'

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
