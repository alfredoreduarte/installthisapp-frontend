const activityIndicators = (state = {
	photoUpload: false,
}, action) => {
	switch (action.type) {
		case 'TOGGLE_ACTIVITY/PHOTO_UPLOAD':
			return { ...state, photoUpload: !state.photoUpload }
		default:
			return state
	}
}

export default activityIndicators