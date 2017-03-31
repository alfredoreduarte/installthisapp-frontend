import React from 'react'
import { connect } from 'react-redux'
import Summary from 'modules/memory_match/components/Summary'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'
import { getCardsForApp } from 'modules/memory_match/selectors/cards'

const Dashboard = ({ checksum, type, entries, hasCards }) => (
	<Summary checksum={checksum} type={type} entries={entries} hasCards={hasCards} />
)

const mapStateToProps = (state, props) => {
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getFilteredEntries(state),
		hasCards: getCardsForApp(state).length > 0,
	}
}

export default connect(mapStateToProps)(Dashboard)