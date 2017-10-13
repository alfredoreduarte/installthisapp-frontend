import entities from 'modules/form/reducers/entities'

const defaultState = {
	log: {},
	entities: {},
	ui: {
		winnerModalVisible: false,
	},
}

const form = (state = defaultState, action) => {
	switch (action.type) {
		case 'ALL_MODULES/CLEANUP':
			return defaultState
		case 'FORM/RECEIVE_ENTITIES':
			return {
				...state,
				entities: entities(state.entities, action),
				log: action.applicationLog,
			}
		case 'FORM/TOGGLE_WINNER_MODAL':
			return {
				...state,
				ui: {
					...state.ui,
					winnerModalVisible: !state.ui.winnerModalVisible,
				}
			}
		default:
			return state
	}
}

export default form