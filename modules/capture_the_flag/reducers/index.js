import entities from 'modules/capture_the_flag/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
}

const captureTheFlag = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'CAPTURE_THE_FLAG/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		default:
			return state
	}
}

export default captureTheFlag
