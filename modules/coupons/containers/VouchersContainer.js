import React from 'react'
import { connect } from 'react-redux'
import { getFilteredVouchers } from 'modules/coupons/selectors/vouchers'
import { fetchEntities } from 'modules/coupons/actions/entities'
import Vouchers from 'modules/coupons/components/Vouchers'

const VouchersContainer = props => <Vouchers {...props} />

const mapStateToProps = (state, props) => ({
	vouchers: getFilteredVouchers(state),
	selectedItems: [],
	showCreationModal: props.params.action == 'create',
	createCouponPath: `/d/apps/${props.params.type}/${props.params.checksum}/vouchers/create`,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchEntities: () => dispatch(fetchEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VouchersContainer)