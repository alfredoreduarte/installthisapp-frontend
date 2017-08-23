import React, { Component, PropTypes } from 'react'
import confirm from 'react-confirm2'
import Select from 'react-select'
import Modal from 'react-modal'
import moment from 'moment'
import { connect } from 'react-redux'
import { getCurrentUsersByKeyword } from 'selectors/users'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { selectItemOnTable, sortUsersBy } from 'actions/users'
import { updateAppSettings } from 'actions/apps'
import { fetchTopFansEntities, fetchTopFansSettings, cleanupTopFansEntities, resetTopFansEntities, pollTopFansEntities } from 'modules/top_fans/actions/entities'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { editAppSpecificSettings, addIgnoredUserIdentifier } from 'modules/top_fans/actions'
import ScoreboardView from 'modules/top_fans/components/Scoreboard'

const Scoreboard = props => (
	<ScoreboardView {...props} />
)

const handleScore = score => score ? score : 0

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	const tabInstalledInPage = getCurrentAppByState(state).page ? _.find(getAllPages(state), {'id': getCurrentAppByState(state).page}).name : null
	return { 
		isCurrentlyPolling: state.topFans.ui.isCurrentlyPolling,
		showResetModal: state.topFans.ui.showResetModal,
		// firstFetchFromDate: currentApp.setting.firstFetchFromDate,
		firstFetchFromDate: currentApp.setting.firstFetchFromDate ? moment(currentApp.setting.firstFetchFromDate) : null,
		// 
		tabIntegrated: tabInstalledInPage,
		entries: getEntriesForPage(state),
		users: getCurrentUsersByKeyword(state, props),
		selectedItems: state.selectedItems,
		sortBy: state.usersSorting
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		toggleResetModal: () => dispatch({
			type: 'TOP_FANS/TOGGLE_RESET_MODAL',
		}),
		onDateChange: date => {
			dispatch(editAppSpecificSettings(date.format()))
		},
		// 
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
				// unmount: () => console.log('unmounted'),
				// close: () => console.log('close!'),
			})
		},
		reset: () => {
			dispatch({
				type: 'TOP_FANS/TOGGLE_RESET_MODAL',
			})
			dispatch({
				type: 'TOP_FANS/TOGGLE_POLLING_STATE',
			})
			dispatch(updateAppSettings()).then(() => {
				dispatch(resetTopFansEntities()).then(() => {
					dispatch(pollTopFansEntities(props.params.checksum))
				})
			})
		},
		addIgnoredUserIdentifier: id => dispatch(addIgnoredUserIdentifier(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)