const applicationData = (
	state = {
		title: null,
		checksum: null,
		canvasId: null,
		appId: null,
	},
	action
) => {
	switch (action.type) {
		case 'RECEIVE_ENTRIES_COUNT':
			return {
				...state,
				entriesCount: action.entriesCount,
			}
		default:
			return state
	}
}

export default applicationData
