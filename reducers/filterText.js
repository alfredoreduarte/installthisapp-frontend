import _ from 'lodash'

const filterText = (state = '', action) => {
	switch (action.type) {
		case 'SEARCH_TEXT':
			return action.payload
		default:
			return state
	}
}

export default filterText