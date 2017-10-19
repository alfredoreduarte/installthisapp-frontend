import { normalize, arrayOf } from 'normalizr'
import { browserHistory } from 'react-router'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/coupons/schema'
import { postToApi } from 'api'
import { receiveEntities } from 'modules/coupons/actions/entities'

export const createVouchers = () => {
	return (dispatch, getState) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const quantity = state.form.couponVouchersCreator.values.quantity
		return postToApi(`applications/${currentApp.checksum}/vouchers_create.json`, {
			quantity,
		}).then( response => {
			if (response) {
				const normalized = normalize(response, schema.entities)
				dispatch(receiveEntities(normalized.entities, response.applicationLog))
				// browserHistory.push(`/d/apps/${currentApp.applicationType}/${currentApp.checksum}/vouchers`)
				return dispatch(temporaryBackHack())
			}
		})
	}
}

export const temporaryBackHack = () => (dispatch, getState) => {
	const state = getState()
	const currentApp = getCurrentAppByState(state)
	return browserHistory.push(`/d/apps/${currentApp.applicationType}/${currentApp.checksum}/vouchers`)
}