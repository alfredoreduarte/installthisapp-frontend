const formEditorUI = (state = {
	submittingImageWithFieldName: null,
	formStep: 0,
	activeFieldIndex: null,
}, action) => {
	switch (action.type) {
		case 'FORM/SET_ACTIVE_FIELD':
			return {
				...state, 
				activeFieldIndex: action.index
			}
		case 'FORM/SET_EDITOR_STEP':
			return {
				...state, 
				formStep: action.step
			}
		case 'FORM/SET_BUSY_IMAGE_UPLOADER':
			return {
				...state, 
				submittingImageWithFieldName: action.name,
			}
		default:
			return state
	}
}

export default formEditorUI