import { createSelector } from 'reselect'
import { getFilteredVouchers } from 'modules/coupons/selectors/vouchers'

export const initialStateSelectorForEditor = createSelector(
	getFilteredVouchers,
	(vouchers) => {
		return {
			vouchers: vouchers,
		}
	}
)