import React from 'react'
import { connect } from 'react-redux'
import Summary from 'modules/memory_match/components/Summary'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'

const Dashboard = ({ checksum, type, entries }) => (
	<Summary checksum={checksum} type={type} entries={entries} />
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getFilteredEntries(state),
	}
}

export default connect(mapStateToProps)(Dashboard)