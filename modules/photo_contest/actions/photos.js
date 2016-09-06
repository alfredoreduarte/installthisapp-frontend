import { postToApi } from 'api'

const deletePhoto = id => ({
	type: 'PHOTO_CONTEST/DELETE_PHOTO',
	id
})

export const postDeletePhotos = ids => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return postToApi(`applications/${checksum}/photos_destroy.json`, {
			id: ids
		}).then( json => {
			ids.map( id => dispatch(deletePhoto(id)) )
		})
	}
}