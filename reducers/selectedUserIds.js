import _ from 'lodash'

const selectedUserIds = (state = [], action) => {
	switch (action.type) {
		case 'SELECT_USER':
			if (_.includes(state, action.id)) {
				return _.difference(state, [action.id])
			}
			return [
				...state,
				action.id
			]
		default:
			return state
	}
}

export default selectedUserIds