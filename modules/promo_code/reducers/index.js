import entities from 'modules/promo_code/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const promoCode = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'PROMO_CODE/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default promoCode
