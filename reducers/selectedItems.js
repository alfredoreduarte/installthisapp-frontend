import _ from 'lodash'

const selectedItems = (state = [], action) => {
	switch (action.type) {
		case 'SELECT_ITEM':
			if (_.includes(state, action.id)) {
				return _.difference(state, [action.id])
			}
			return [...state, action.id]
		case 'RESET_SELECTED_ITEMS':
			return []
		default:
			return state
	}
}

export default selectedItems
