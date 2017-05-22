import { postToApi } from 'api'
import { toggleProductRequestSent } from 'canvas/catalog/actions/ui'

// product messages
export const sendProductMessage = id => {
	return (dispatch, getState) => {
		const message = getState().form.catalogContact.values
		const { checksum } = getState().applicationData
		return postToApi(`${checksum}/messages_create.json`, {
			message: {
				...message,
				productId: id,
			}
		})
		.then(response => {
			if (response.success) {
				dispatch(toggleProductRequestSent())
			}
		})
		.catch(exception =>
			console.log('postNewApp: parsing failed', exception)
		)
	}
}