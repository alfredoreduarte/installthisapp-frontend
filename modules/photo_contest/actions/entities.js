import { normalize, arrayOf } from 'normalizr'
import * as schema from 'modules/photo_contest/schema'
import { getFromApi } from 'api'

export const receivePhotoContestEntities = (entities) => ({
	type: 'PHOTO_CONTEST/RECEIVE_ENTITIES',
	response: {
		entities
	}
})

export const fetchPhotoContestEntities = (checksum) => {
	return dispatch => {
		return getFromApi(`applications/${checksum}/photos.json`).then( json => {
			console.log('photos', json)
			const normalized = normalize(json, schema.entities)
			console.log('normal', normalized)
			dispatch(receivePhotoContestEntities(normalized.entities))
		})
	}
}