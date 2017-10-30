import { normalize, arrayOf } from 'normalizr'
import { push } from 'react-router-redux'
import { postToApi, getExternal } from 'canvas/api'
import { fetchEntities, resetEntitiesCacheFlag } from 'canvas/photo_contest/actions/entities'
import { getPhotoForUser } from 'canvas/photo_contest/selectors/photos'
import * as schema from 'canvas/photo_contest/schema'
import { togglePostingPhoto } from 'canvas/photo_contest/actions/activityIndicators'

// export const receivePhotos = entities => ({
// 	type: 'RECEIVE_PHOTOS',
// 	entities,
// })

export const uploadPhoto = () => {
	return (dispatch, getState) => {
		dispatch(togglePostingPhoto())
		const state = getState()
		const { checksum } = state.applicationData
		return postToApi(
			`${checksum}/upload.json`,
			{
				photo: state.form.uploadForm.values,
			},
			response => {
				dispatch(togglePostingPhoto())
				dispatch(resetEntitiesCacheFlag())
				return dispatch(fetchEntities()).then(() => dispatch(push(`/photo_contest/${window.checksum}/${response.id}`)))
				//
				// const normalized = normalize(response, schema.entities)
				// return dispatch(receiveEntities(normalized.entities))
			}
		)
	}
}

export const handleUploadIntention = () => {
	return (dispatch, getState) => {
		const state = getState()
		const photo = getPhotoForUser(state)
		const multipleUploadsAllowed = state.settings.multiplePhotosPerUser
		if (multipleUploadsAllowed) {
			return dispatch(push(`/photo_contest/${window.checksum}/upload`))
		} else if (photo) {
			return dispatch(push(`/photo_contest/${window.checksum}/${photo.id}`))
		} else {
			return dispatch(push(`/photo_contest/${window.checksum}/upload`))
		}
		// dispatch(push(`/photo_contest/${window.checksum}/upload`))
	}
}
