import v4 from 'node-uuid'
import { postToApi, deleteFromApi } from 'api'
import { getCurrentAppByState } from 'selectors/apps'

// Manage categories
export const createCategory = category => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		const checksum = currentApp.checksum
			const thisUUID = v4()
			dispatch(addCategory({
				id: thisUUID,
				applicationId: currentApp.id,
				status: 'uploading',
			}))
			return postToApi(`applications/${checksum}/categories_create.json`, { category: category }).then(response => {
				console.log('resp')
				console.log(response)
				dispatch(removeCategory(thisUUID))
				return dispatch(addCategory(response))
			})
		})
	}
}

export const deleteCategory = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/categories_destroy.json`, { id }).then(response => {
			if (response.status == 'ok') {
				return dispatch(removeCategory(id))
			}
		})
	}
}

export const removeCategory = id => ({
	type: 'CATALOG/REMOVE_CATEGORY',
	id,
})

export const addCategory = category => ({
	type: 'CATALOG/ADD_CATEGORY',
	category,
})