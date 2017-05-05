const ui = (state = {
	showFeaturedImagePicker: false,
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
		case 'CATALOG/SHOW_FEATURED_IMAGE_PICKER':
			return {
				...state, 
				showFeaturedImagePicker: true,
			}
		case 'CATALOG/HIDE_FEATURED_IMAGE_PICKER':
			return {
				...state, 
				showFeaturedImagePicker: false,
			}
		default:
			return state
	}
}

export default ui