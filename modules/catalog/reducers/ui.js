const ui = (state = {
	showImagePicker: false,
}, action) => {
	switch (action.type) {
		case 'CATALOG/SHOW_IMAGE_PICKER':
			return {
				...state, 
				showImagePicker: true,
			}
		case 'CATALOG/HIDE_IMAGE_PICKER':
			return {
				...state, 
				showImagePicker: false,
			}
		default:
			return state
	}
}

export default ui