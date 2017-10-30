const activityIndicators = (
	state = {
		uploadingImage: false,
		postingPhoto: false,
	},
	action
) => {
	switch (action.type) {
		case 'TOGGLE_ACTIVITY/UPLOADING_IMAGE':
			return {
				...state,
				uploadingImage: !state.uploadingImage,
			}
		case 'TOGGLE_ACTIVITY/TOGGLE_ACTIVITY/POSTING':
			return {
				...state,
				postingPhoto: !state.postingPhoto,
			}
		default:
			return state
	}
}

export default activityIndicators
