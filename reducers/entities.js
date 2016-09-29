import apps from 'reducers/apps'
import users from 'reducers/users'
import pages from 'reducers/pages'

const entities = (state = { apps: {}, users: {}, pages: {} }, action) => {
	switch (action.type) {
		case 'INSTALLING_APP':
		case 'UNINSTALLING_APP':
		case 'UPDATE_APP':
			return { 
				...state, 
				apps: apps(state.apps, action)
			}
		case 'RECEIVE_ENTITIES':
			return {...state, ...action.response.entities}
		default:
			return state
	}
}

export default entities