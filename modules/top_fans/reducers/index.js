import _ from 'lodash'

const topFans = (state = {
	likes: {},
}, action) => {
	switch (action.type) {
		case 'TOP_FANS/RECEIVE_ENTITIES':
			return Object.assign({}, state, {
				likes: _.merge({}, state.likes, action.response.entities)
			})
		default:
			return state
	}
}

export default topFans