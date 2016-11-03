import _ from 'lodash'

export const setAlert = (title, content) => {
	return {
		type: 'SET_ALERT',
		title,
		content
	}
}