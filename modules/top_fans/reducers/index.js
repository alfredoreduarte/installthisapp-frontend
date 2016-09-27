import _ from 'lodash'

const topFans = (state = {
	likes: {},
}, action) => {
	switch (action.type) {
		case 'TOP_FANS/RECEIVE_ENTITIES':
			console.log('action')
			console.log(action)
			const coso = { ...state, likes: action.response.entities }
			console.log('coso', coso)
			return coso
		default:
			return state
	}
}

export default topFans