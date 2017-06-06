import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/memory_match/schema'
import { getFromApi } from 'api'

export const receiveEntities = (entities, applicationLog) => ({
	type: 'MEMORY_MATCH/RECEIVE_ENTITIES',
	entities,
	applicationLog,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		return getFromApi(`applications/${currentApp.checksum}/entities.json`).then( response => {
			if (response) {
				const normalized = normalize(response, schema.entities)
				dispatch(receiveEntities(normalized.entities, response.applicationLog))
			}
		})
	}
}

export const beforeShowingDashboard = fetchEntities