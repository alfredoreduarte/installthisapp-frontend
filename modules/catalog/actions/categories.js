import v4 from 'node-uuid'
import { postToApi, deleteFromApi } from 'api'
import { receiveEntities } from 'modules/catalog/actions/entities'
import { getCurrentAppByState } from 'selectors/apps'

export const postNewCategoryWithReduxForm = () => {
	return (dispatch, getState) => {
		const category = getState().form.catalogCategoryCreator.values
		const checksum = getState().admin.currentApp
		// logic Category
		const thisUUID = v4()
		const currentApp = getCurrentAppByState(getState())
		dispatch(addCategory({
			...category,
			id: thisUUID,
			applicationId: currentApp.id,
			status: 'uploading',
		}))
		// logic Category
		let url
		if (category.id) {
			url = `applications/${checksum}/categories_update/${category.id}.json`
		}
		else{
			url = `applications/${checksum}/categories_create.json`
		}
		return postToApi(url, {
			category: _.omit(category, ['id'])
		})
		.then(response => {
			dispatch(removeCategory(thisUUID))
			return dispatch(addCategory(response))
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}

// Manage categories

export const deleteCategory = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/categories_destroy/${id}.json`).then(response => {
			return dispatch(removeCategory(id))
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