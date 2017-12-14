import React from 'react'
import { connect } from 'react-redux'
import { getFilteredEntries } from 'modules/promo_code/selectors/entries'
import Summary from 'modules/promo_code/components/Summary'

const Dashboard = props => <Summary {...props} />

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getFilteredEntries(state),
	}
}

export default connect(mapStateToProps)(Dashboard)
