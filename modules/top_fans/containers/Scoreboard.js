import React, { Component, PropTypes } from 'react'
import confirm from 'react-confirm2'
import Select from 'react-select'
import Modal from 'react-modal'
import moment from 'moment'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import { updateAppSettings } from 'actions/apps'
import { 
	fetchTopFansEntities, 
	fetchTopFansSettings, 
	cleanupTopFansEntities, 
	resetTopFansEntities, 
	pollTopFansEntities,
	fetchTopFansDetails,
} from 'modules/top_fans/actions/entities'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { editAppSpecificSettings, addIgnoredUserIdentifier, generateCsv } from 'modules/top_fans/actions'
import ScoreboardView from 'modules/top_fans/components/Scoreboard'

const Scoreboard = props => (
	<ScoreboardView {...props} />
)

const handleScore = score => score ? score : 0

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	return { 
		checksum: currentApp.checksum,
		isCurrentlyPolling: state.topFans.ui.isCurrentlyPolling,
		firstFetchFromDate: currentApp.setting.firstFetchFromDate ? moment(currentApp.setting.firstFetchFromDate) : null,
		// 
		tabIntegrated: tabInstalledInPage,
		entries: getEntriesForPage(state),
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		generateCsv: () => dispatch(generateCsv()),
		fetchDetailsDemo: () => dispatch(fetchTopFansDetails(10211176012778316)),
		handleUserSelect: id => {
			dispatch(selectItemOnTable(id))
		},
		handleUserSelectBatch: users => {
			users.map(user => dispatch(selectItemOnTable(user.id)))
		},
		handleSort: sorter => dispatch(sortUsersBy(sorter)),
		fetch: () => dispatch(fetchTopFansEntities(props.params.checksum)),
		cleanup: () => {
			confirm('Sure? This will delete ALL current scores', {
				done: () => dispatch(cleanupTopFansEntities()),
				confirmLabel: 'Delete all scores',
				abortLabel: 'Cancel',
			})
		},
		addIgnoredUserIdentifier: id => dispatch(addIgnoredUserIdentifier(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)