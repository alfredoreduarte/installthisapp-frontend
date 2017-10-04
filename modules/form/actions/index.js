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
		return postToApi(`applications/${checksum}/save.json`, {
			schema: formSchema
		}).then( response => {
			if (response) {
				// return dispatch(saveStyles())

				// Use this instead of saveStyles at actions/styles because
				// now we're using redux-form
				dispatch(toggleActivitySavingDesign())
				const cssString = css.stringify(state.styles.ruleset)
				const messages = JSON.stringify(state.form.formEditor.values.messages)
				const images = JSON.stringify(state.form.formEditor.values.images)
				const settings = state.form.formEditor.values.settings
				return postToApi(`applications/${checksum}/save_app_from_new_form_editor.json`, {
					css: cssString,
					messages,
					images,
					settings,
				}).then(response => dispatch(toggleActivitySavingDesign()))
			}
		})
	}
}