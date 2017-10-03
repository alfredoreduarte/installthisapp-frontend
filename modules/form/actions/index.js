import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/form/schema'
import { postToApi } from 'api'

export const receiveEntities = (entities, applicationLog) => ({
	type: 'FORM/RECEIVE_ENTITIES',
	entities,
	applicationLog,
})

export const saveForm = () => {
	return (dispatch, getState) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const formSchema = state.form.formEditor.values.schema
		return postToApi(`applications/${currentApp.checksum}/save.json`, {
			schema: formSchema
		}).then( response => {
			if (response) {
				// const normalized = normalize(response, schema.entities)
				// dispatch(receiveEntities(normalized.entities, response.applicationLog))
				console.log(response)
			}
		})
	}
}