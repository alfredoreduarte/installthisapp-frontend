import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/catalog/schema'
import { getFromApi } from 'api'

export const receiveEntities = entities => ({
	type: 'CATALOG/RECEIVE_ENTITIES',
	entities,
})

export const fetchEntities = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		return getFromApi(`applications/${currentApp.checksum}/entities.json`).then( json => {
			if (json) {
				const normalized = normalize(json, schema.entities)
				dispatch(receiveEntities(normalized.entities))
			}
		})
	}
}

export const beforeShowingDashboard = fetchEntities