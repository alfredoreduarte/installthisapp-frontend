import { normalize, arrayOf } from 'normalizr'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/photo_contest/schema'
import { getFromApi } from 'api'

export const receivePhotoContestEntities = (entities) => ({
	type: 'PHOTO_CONTEST/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchPhotoContestEntities = () => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		return getFromApi(`applications/${currentApp.checksum}/photos.json`).then( json => {
			console.log('photos', json)
			if (json) {
				const normalized = normalize(json, schema.entities)
				console.log('normal', normalized)
				dispatch(receivePhotoContestEntities(normalized.entities))
			}
		})
	}
}