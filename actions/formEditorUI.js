import _ from 'lodash'

export const setActiveEntryFormField = index => ({
	type: 'EDITOR/SET_ACTIVE_FIELD',
	index,
})

export const setEditorStepIndexWithConditionalScreen = index => {
	return (dispatch, getState) => {
		dispatch(setEditorStepIndex(index))
		// 
		// Conditionally trigger a screen based on the current step:
		// 
		const state = getState()
		const triggerScreen = state.formEditorUI.editorSteps[index].triggerScreen
		if (triggerScreen) {
			const screenIndexBasedOnSlug = _.findIndex(state.formEditorUI.editorScreens, screen => screen.value == triggerScreen)
			dispatch( setEditorScreenIndex(screenIndexBasedOnSlug) )
		}
	}
}

export const setEditorStepIndex = step => ({
	type: 'EDITOR/SET_STEP',
	step,
})

export const setBusyImageUploader = name => ({
	type: 'EDITOR/SET_BUSY_IMAGE_UPLOADER',
	name,
})

export const setEditorScreenIndex = screen => {
	return {
		type: 'EDITOR/SET_SCREEN',
		screen,
	}
}

export const initializeEditorScreensAndSteps = ( editorSteps, editorScreens ) => ({
	type: 'EDITOR/INITIALIZE_STEPS_AND_SCREENS',
	editorSteps,
	editorScreens,
})