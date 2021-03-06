import React from 'react'
import { connect } from 'react-redux'
import { getFilteredVouchers } from 'modules/coupons/selectors/vouchers'
import Summary from 'modules/coupons/components/Summary'

const Dashboard = props => <Summary {...props} />

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getFilteredVouchers(state),
	}
}

export default connect(mapStateToProps)(Dashboard)