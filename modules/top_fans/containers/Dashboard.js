import React from 'react'
import { connect } from 'react-redux'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { getCurrentAppByState } from 'selectors/apps'
import { getAllPages } from 'selectors/pages'
import Summary from 'modules/top_fans/components/Summary'

const Dashboard = ({ checksum, type, entries }) => (
	<Summary checksum={checksum} type={type} entries={entries} />
)

const mapStateToProps = (state, props) => {
	return {
		tabInstalledInPage: getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page.id}) : null,
		checksum: props.params.checksum,
		type: props.params.type,
		entries: getEntriesForPage(state).slice(0,5),
	}
}

export default connect(mapStateToProps)(Dashboard)