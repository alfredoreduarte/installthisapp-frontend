import { normalize, arrayOf } from 'normalizr'
import { APP_EDITOR_FORM_NAME } from 'config'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivitySavingDesign } from 'actions/activityIndicators'
import { postToApi } from 'api'

const editorCallback = () => {
	return (dispatch, getState) => {
		const state = getState()
		const checksum = getCurrentAppByState(state).checksum
		// return postToApi(`applications/${checksum}/save.json`, {
			
		// })
		return Promise.resolve()
	}
}

export default editorCallback