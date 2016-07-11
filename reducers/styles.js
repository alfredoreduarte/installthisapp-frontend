import _ from 'lodash'

const styles = (state = {
	currentSelector: [],
	ruleset: {},
	results: {
		'.fdsafds .fdsafdsa-fdsa, .fdsaf': {
			'font-family': '12px',
			'color': 'blue',
		}
	},
}, action) => {
	switch (action.type) {
		case 'RECEIVE_STYLES':
			return Object.assign({}, state, {
				ruleset: action.payload
			})
		case 'SET_STYLES_SELECTOR':
			return Object.assign({}, state, {
				currentSelector: action.payload
			})
		default:
			return state
	}
}

export default styles