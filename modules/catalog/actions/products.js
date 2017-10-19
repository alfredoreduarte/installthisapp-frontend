import v4 from 'node-uuid'
import { postToApi, deleteFromApi } from 'api'
import { receiveEntities } from 'modules/catalog/actions/entities'
import { toggleActivityUpdatingApp } from 'actions/activityIndicators'
import { getCurrentAppByState } from 'selectors/apps'

export const postNewProductWithReduxForm = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingApp())
		const product = getState().form.catalogProduct.values
		const checksum = getState().admin.currentApp
		// logic Product
		const thisUUID = v4()
		const currentApp = getCurrentAppByState(getState())
		dispatch(addProduct({
			...product,
			id: thisUUID,
			applicationId: currentApp.id,
			status: 'uploading',
		}))
		// logic Product
		let url
		if (product.id) {
			url = `applications/${checksum}/products_update/${product.id}.json`
		}
		else{
			url = `applications/${checksum}/products_create.json`
		}
		return postToApi(url, {
			product: _.omit(product, ['id'])
		})
		.then(response => {
			dispatch(toggleActivityUpdatingApp())
			dispatch(removeProduct(thisUUID))
			// const normalized = normalize(response, schema.entities)
			// dispatch(receiveEntities(normalized.entities))
			return dispatch(addProduct(response))
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}

// Manage products
export const createProduct = product => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		const checksum = currentApp.checksum
		return postToApi(`applications/${checksum}/products_create.json`, { product: product }).then(response => {
			dispatch(removeProduct(thisUUID))
			return dispatch(addProduct(response))
		})
	}
}

export const deleteProduct = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/products_destroy/${id}.json`).then(response => {
			return dispatch(removeProduct(id))
		})
	}
}

export const removeProduct = id => ({
	type: 'CATALOG/REMOVE_PRODUCT',
	id,
})

export const addProduct = product => ({
	type: 'CATALOG/ADD_PRODUCT',
	product,
})