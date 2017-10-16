import _ from 'lodash'
import css from 'css'
import { postToApi } from 'api'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'

export const setActiveEntryFormField = index => ({
	type: 'EDITOR/SET_ACTIVE_FIELD',
	index,
})

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

export const saveAppFromNewEditor = () => {
	return (dispatch, getState) => {
		const state = getState()
		const checksum = getCurrentAppByState(state).checksum
		const appType = getCurrentAppByState(state).applicationType
		const callbackAction = require(`modules/${appType}/actions/editorCallbacks`).default
		const fields = state.form.formEditor.registeredFields.map(field => field.name)
		// Redux-form actions
		dispatch({
			type: '@@redux-form/START_SUBMIT',
			meta: { form: APP_EDITOR_FORM_NAME, fields },
			error: false
		})

		// Use this instead of saveStyles at actions/styles because
		// now we're using redux-form
		const cssString = css.stringify(state.styles.ruleset)
		const messages = JSON.stringify(state.form.formEditor.values.messages)
		const images = JSON.stringify(state.form.formEditor.values.images)
		const settings = state.form.formEditor.values.settings
		return postToApi(`applications/${checksum}/save_app_from_new_form_editor.json`, {
			css: cssString,
			messages,
			images,
			settings,
		}).then(response => {
			// Redux-form actions
			dispatch( callbackAction() ).then(() => {
				dispatch({
					type: '@@redux-form/STOP_SUBMIT',
					meta: { form: APP_EDITOR_FORM_NAME, fields },
					error: false
				})
				dispatch({
					type: '@@redux-form/SET_SUBMIT_SUCCEEDED',
					meta: { form: APP_EDITOR_FORM_NAME, fields },
					error: false
				})
			})
		})
	}
}