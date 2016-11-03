import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { setAlert } from 'actions/alerts'

export const upgrade = plan => {
	return dispatch => {
		console.log('plan upgrade!')
		const body = { plan: plan }
		return postToApi('subscriptions/update.json', body).then(response => {
			console.log('response', response)
			// location.reload()
		})
	}
}

export const cancel = () => {
	return dispatch => {
		console.log('plan cancel!')
		deleteFromApi('subscriptions/delete.json')
		.then(response => {
			console.log('response', response)
			// location.reload()
		})
	}
}

export const purchase = (token, plan, hasCustomer) => {
	return dispatch => {
		// If the admin already is a registered customer, we just create a new subscription
		// Otherwise, we create a new customer attached to a subscription
		const url = hasCustomer ? 'subscriptions.json' : 'customers.json'
		postToApi(
			url, 
			{
				...token,
				plan,
			}
		).then(response => {
			if (response.success) {
				dispatch(setAlert('Yay!', response.message))
				console.log('We are in business')
				location.reload()
			}
			else{
				dispatch(setAlert('Error.', response.message))
				console.log('Error', response)
			}
		})
	}
}