import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivitySavingDesign } from 'actions/activityIndicators'
import css from 'css'
import * as schema from 'modules/form/schema'
import { postToApi } from 'api'

export const saveForm = () => {
	return (dispatch, getState) => {
		const state = getState()
		const checksum = getCurrentAppByState(state).checksum
		const formSchema = state.form.formEditor.values.schema
		const fields = state.form.formEditor.registeredFields.map(field => field.name)
		// Redux-form actions
		dispatch({
			type: '@@redux-form/START_SUBMIT',
			meta: { form: 'formEditor', fields },
			error: false
		})
		return postToApi(`applications/${checksum}/save.json`, {
			schema: formSchema
		}).then( response => {
			if (response) {
				// return dispatch(saveStyles())

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
					dispatch({
						type: '@@redux-form/STOP_SUBMIT',
						meta: { form: 'formEditor', fields },
						error: false
					})
					dispatch({
						type: '@@redux-form/SET_SUBMIT_SUCCEEDED',
						meta: { form: 'formEditor', fields },
						error: false
					})
				})
			}
		})
	}
}