import { normalize, arrayOf } from 'normalizr'
import { browserHistory } from 'react-router'
import { getCurrentAppByState } from 'selectors/apps'
import * as schema from 'modules/coupons/schema'
import { postToApi, deleteFromApi } from 'api'
import { receiveEntities } from 'modules/coupons/actions/entities'

export const createVouchers = () => {
	return (dispatch, getState) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const formValues = state.form.couponVouchersCreator.values
		// if (formValues.mode == 'auto') {}
		// const quantity = state.form.couponVouchersCreator.values.quantity
		return postToApi(`applications/${currentApp.checksum}/vouchers_create.json`, formValues).then( response => {
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

export const deleteVoucher = id => {
	return (dispatch, getState) => {
		const checksum = getState().admin.currentApp
		return deleteFromApi(`applications/${checksum}/vouchers_destroy.json`, { id }).then(response => {
			if (response.status == 'ok') {
				return dispatch(removeVoucher(id))
			}
		})
	}
}

export const removeVoucher = id => ({
	type: 'COUPONS/REMOVE_VOUCHER',
	id,
})