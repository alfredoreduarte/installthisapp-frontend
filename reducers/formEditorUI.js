const formEditorUI = (state = {
	submittingImageWithFieldName: null,
	activeFieldIndex: null,
	editorSteps: null,
	editorScreens: null,
	step: 0,
	screen: 0,
	platform: 'mobile',
}, action) => {
	switch (action.type) {
		case 'EDITOR/SET_ACTIVE_FIELD':
			return {
				...state, 
				activeFieldIndex: action.index
			}
		case 'EDITOR/SET_BUSY_IMAGE_UPLOADER':
			return {
				...state, 
				submittingImageWithFieldName: action.name,
			}
		case 'EDITOR/SET_STEP':
			return {
				...state, 
				step: action.step,
			}
		case 'EDITOR/SET_SCREEN':
			return {
				...state, 
				screen: action.screen,
			}
		case 'EDITOR/INITIALIZE_STEPS_AND_SCREENS':
			return {
				...state, 
				editorSteps: action.editorSteps,
				editorScreens: action.editorScreens,
			}
		default:
			return state
	}
}

export default formEditorUI