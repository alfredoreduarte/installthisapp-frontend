import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { install } from 'actions/apps'
import { toggleShareModal } from 'actions/applicationData'
import { getCurrentAppByState } from 'selectors/apps'
import { getFilteredEntries } from 'modules/memory_match/selectors/entries'
import { getCardsForApp } from 'modules/memory_match/selectors/cards'
import Summary from 'modules/memory_match/components/Summary'

const Dashboard = ({ checksum, type, entries, completed, steps, install, share, tabInstalled }) => (
	<Summary checksum={checksum} type={type} entries={entries} completed={completed} steps={steps} install={install} share={share} tabInstalled={tabInstalled} />
)

const mapStateToProps = (state, props) => {
	const steps = [
		getCardsForApp(state).length > 0,
		state.memoryMatch.log.designEdited ? true : false,
		getCurrentAppByState(state).status == 'installed',
		// state.memoryMatch.log.fbTabInstalled ? true : false, // FB Tab is not mandatory
	]
	const completed = _.without(steps, false).length
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getFilteredEntries(state),
		// hasCards: getCardsForApp(state).length > 0,
		steps,
		completed,
		tabInstalled: state.memoryMatch.log.fbTabInstalled ? true : false,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	install: () => dispatch(install(props.params.checksum)),
	share: () => dispatch(toggleShareModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)