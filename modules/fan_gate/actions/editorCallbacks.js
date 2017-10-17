import { normalize, arrayOf } from 'normalizr'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivitySavingDesign } from 'actions/activityIndicators'
import * as schema from 'modules/form/schema'
import { postToApi } from 'api'

const editorCallback = () => {
	return (dispatch, getState) => {
		const state = getState()
		const checksum = getCurrentAppByState(state).checksum
		// const formSchema = state.form.formEditor.values.schema
		// return postToApi(`applications/${checksum}/save.json`, {
		// 	schema: formSchema
		// })
		return Promise.resolve()
	}
}

export default editorCallback