import _ from 'lodash'

const likes = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_LIKES':
			// return _.merge({}, state, action.response.entities)
			console.log('ent')
			console.log(action.response.entities)
			return action.response.entities
		default:
			return state
	}
}

export default likes