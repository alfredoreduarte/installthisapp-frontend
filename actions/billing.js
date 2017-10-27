import { postToApi, getFromApi, patchToApi, deleteFromApi } from 'api'
import { setAlert } from 'actions/alerts'
import { toggleActivityPurchasing } from 'actions/activityIndicators'
import { fetchAdmin } from 'actions/admin'

export const purchase = (token, planId, hasCustomer, onSuccess, couponCode) => {
	return dispatch => {
		dispatch(toggleActivityPurchasing())
		const url = `payola/subscribe/subscription_plan/${planId}.json`
		return postToApi(
			url,
			{
				stripeToken: token.id,
				stripeEmail: token.email,
				coupon_code: couponCode,
			},
			// we passs an empty "response" function argument, and false as the last argument in order to avoid
			// passing from camelCase to snake_case
			() => {},
			false
		).then(response => {
			if (!response.error) {
				dispatch(setAlert('Please wait.', 'Your purchase is being processed.'))
				dispatch(pollSubscriptionUpdate(response.guid, planId, onSuccess))
			} else {
				dispatch(setAlert('Error.', response.error))
				dispatch(toggleActivityPurchasing())
				console.log('Error', response)
			}
		})
	}
}

export const pollSubscriptionUpdate = (guid, planId, onSuccess) => {
	return dispatch => {
		const elInterval = setInterval(() => {
			getFromApi(`payola/subscription_status/${guid}.json`).then(response => {
				if (response.status == 'active') {
					clearInterval(elInterval)
					analytics.track(
						'Subscription Started',
						{
							plan: planId,
						},
						() => {
							dispatch(fetchAdmin()).then(() => {
								dispatch(setAlert('Thanks!', 'Your Subscription has been upgraded'))
								dispatch(toggleActivityPurchasing())
							})
							if (onSuccess) {
								onSuccess()
							}
						}
					)
				}
			})
		}, 1000)
	}
}

export const upgrade = plan => {
	return (dispatch, getState) => {
		const guid = getState().admin.subscription.guid
		if (guid) {
			dispatch(toggleActivityPurchasing())
			const body = { planId: plan, plan_class: 'subscription_plan' }
			return postToApi(`payola/change_plan/${guid}.json`, body).then(response => {
				dispatch(fetchAdmin()).then(() => {
					dispatch(setAlert('Yay!', 'Your Plan has been upgraded'))
					dispatch(toggleActivityPurchasing())
				})
				// location.reload()
			})
		} else {
			dispatch(setAlert('Error.', 'We could not find a subscription to update. Please contact support.'))
			console.log('Admin does not have a subscription to update')
		}
	}
}

export const cancel = () => {
	return (dispatch, getState) => {
		dispatch(toggleActivityPurchasing())
		const guid = getState().admin.subscription.guid
		deleteFromApi(`payola/cancel_subscription/${guid}.json`).then(response => {
			dispatch(fetchAdmin()).then(() => {
				dispatch(setAlert('Done.', 'Your subscription has been canceled.'))
				dispatch(toggleActivityPurchasing())
			})
			// location.reload()
		})
	}
}
