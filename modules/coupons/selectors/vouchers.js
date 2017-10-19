import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllVouchers = state => _.values(state.coupons.entities.vouchers)

export const getFilteredVouchers = createSelector(
	getAllVouchers,
	vouchers => {
		return _.filter(vouchers, voucher => voucher.status != 'deleted')
	}
)