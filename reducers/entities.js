import _ from 'lodash'
import apps from 'reducers/apps'
import users from 'reducers/users'
import pages from 'reducers/pages'

const entities = (state = { apps: {}, users: {}, pages: {} }, action) => {
	switch (action.type) {
		case 'DELETE_APP':
			return Object.assign({}, state, {
				apps: apps(state.apps, action)
			})
		case 'RECEIVE_ENTITIES':
			return _.merge({}, state, action.response.entities)
		default:
			return state
	}
}

export default entities