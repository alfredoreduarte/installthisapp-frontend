import React from 'react'
import { connect } from 'react-redux'
import Summary from 'modules/static_html/components/Summary'

const Dashboard = props => <Summary {...props} />

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: [],
	}
}

export default connect(mapStateToProps)(Dashboard)