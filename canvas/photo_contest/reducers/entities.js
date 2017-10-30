// import photos from 'canvas/photo_contest/reducers/photos'

const entities = (
	state = {
		fetched: false,
		photos: {},
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
			}
		default:
			return state
	}
}

export default entities
