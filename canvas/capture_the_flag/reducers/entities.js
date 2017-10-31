const entities = (
	state = {
		fetched: false,
		timeLeft: 0,
	},
	action
) => {
	switch (action.type) {
		case 'ENTITIES/RESET_CACHE_FLAG':
			return {
				...state,
				fetched: false,
			}
		case 'RECEIVE_ENTITIES':
			return {
				...state,
				fetched: true,
				...action.entities,
				timeLeft: action.timeLeft,
			}
		default:
			return state
	}
}

export default entities
