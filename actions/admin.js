import { fbLogin, fbCheckPagesPerms } from 'lib/facebook'
import { fetchEntities } from 'actions/entities'
import { readFromApi } from 'api'

export const receiveAdmin = payload => ({
	type: 'RECEIVE_ADMIN',
	payload
})

export const fetchAdmin = () => {
	return dispatch => 
		readFromApi('admin_users.json', response => {
			dispatch(receiveAdmin(response))
			dispatch(fetchEntities())
		})
}