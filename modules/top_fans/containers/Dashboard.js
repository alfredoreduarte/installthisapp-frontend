import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { install } from 'actions/apps'
import { toggleShareModal } from 'actions/applicationData'
import { getCurrentAppByState } from 'selectors/apps'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import Summary from 'modules/top_fans/components/Summary'

const Dashboard = ({ checksum, type, entries, completed, steps, share }) => (
	<Summary checksum={checksum} type={type} entries={entries} completed={completed} steps={steps} share={share} />
)

const mapStateToProps = (state, props) => {
	const steps = [
		state.topFans.log.designEdited ? true : false,
		state.topFans.log.fbTabInstalled ? true : false, // FB Tab is not mandatory
	]
	const completed = _.without(steps, false).length
	return {
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getEntriesForPage(state),
		steps,
		completed,
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	share: () => dispatch(toggleShareModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)