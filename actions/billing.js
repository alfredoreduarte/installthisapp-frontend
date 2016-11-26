import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { setAlert } from 'actions/alerts'
import { toggleActivityPurchasing } from 'actions/activityIndicators'

export const upgrade = plan => {
	return dispatch => {
		dispatch(toggleActivityPurchasing())
		const body = { plan: plan }
		return postToApi('subscriptions/update.json', body).then(response => {
			dispatch(setAlert('Yay!', 'Plan upgraded'))
			dispatch(toggleActivityPurchasing())
			location.reload()
		})
	}
}

export const cancel = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityPurchasing())
		const guid = getState().admin.subscription.guid
		deleteFromApi(`payola/cancel_subscription/${guid}.json`)
		.then(response => {
			dispatch(setAlert('Done.', 'Your plan has been canceled.'))
			dispatch(toggleActivityPurchasing())
			// location.reload()
		})
	}
}

export const purchase = (token, planId, hasCustomer) => {
	return dispatch => {
		// If the admin already is a registered customer, we just create a new subscription
		// Otherwise, we create a new customer attached to a subscription
		// const url = hasCustomer ? 'subscriptions.json' : 'customers.json'
		dispatch(toggleActivityPurchasing())
		const url = `payola/subscribe/subscription_plan/${planId}.json`
		postToApi(
			url, 
			{
				stripeToken: token.id,
				stripeEmail: token.email,
			}
		).then(response => {
			if (!response.error) {
				dispatch(setAlert('Yay!', `Your purchase status is: ${response.status}`))
				// location.reload()
			}
			else{
				dispatch(setAlert('Error.', response.error))
				console.log('Error', response)
			}
		})
	}
}