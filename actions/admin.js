import { fbLogin, fbCheckPagesPerms } from 'lib/facebook'
import { toggleActivityUpdatingAdmin } from 'actions/activityIndicators'
import { getFromApi, patchToApi } from 'api'

export const receiveAdmin = payload => ({
	type: 'RECEIVE_ADMIN',
	payload
})

export const fetchAdmin = () => {
	return dispatch => getFromApi('admin_users.json').then( response => dispatch(receiveAdmin(response)))
}

export const updateInfo = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingAdmin())
		const formData = getState().form.adminUserProfile.values
		const body = {
			admin_user: formData
		}
		patchToApi(
			`admin_users/${getState().admin.id}.json`, 
			body
		).then( response => {
			dispatch(receiveAdmin(response))
			dispatch(toggleActivityUpdatingAdmin())
		})
	}
}