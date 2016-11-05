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

export const simulatePurchase = () => {
	return dispatch => {
		// const url = 'payola/subscribe/subscription_plan/1.json'
		const url = 'subscriptions.json'
		postToApi(
			url, 
			{
				planId: 1,
				payolaPlanType: 'subscription_plan',
				email: 'alfredoreduarte@gmail.com',
				number: '4242424242424242',
				expMonth: 12,
				expYear: 19,
				cvc: 129,
			}
		).then(response => {
			if (response.success) {
				dispatch(setAlert('Yay!', response))
				// console.log('We are in business')
				// location.reload()
			}
			else{
				dispatch(setAlert('Error.', response.message))
				console.log('Error', response)
			}
		})
	}
}

export const purchase = (token, plan, hasCustomer) => {
	return dispatch => {
		// If the admin already is a registered customer, we just create a new subscription
		// Otherwise, we create a new customer attached to a subscription
		// const url = hasCustomer ? 'subscriptions.json' : 'customers.json'
		const url = 'payola/subscribe/subscription_plan/1.json'
		console.log(token)
		postToApi(
			url, 
			{
				stripeToken: token.id,
				stripeEmail: token.email,
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