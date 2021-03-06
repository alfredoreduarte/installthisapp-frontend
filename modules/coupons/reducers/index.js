import entities from 'modules/coupons/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const coupons = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'COUPONS/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		case 'COUPONS/REMOVE_VOUCHER':
			return {
				...state,
				entities: entities(state.entities, action),
			}
		default:
			return state
	}
}

export default coupons