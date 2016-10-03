import { postToApi } from 'api'

const deleteVote = id => ({
	type: 'PHOTO_CONTEST/DELETE_VOTE',
	id
})

export const postDeleteVotes = ids => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return postToApi(`applications/${checksum}/votes_destroy.json`, {
			id: ids
		}).then( json => {
			ids.map( id => dispatch(deleteVote(id)) )
		})
	}
}