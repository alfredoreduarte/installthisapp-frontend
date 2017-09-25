import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import moment from 'moment'
import Modal from 'react-modal'
import { updateAppSettings } from 'actions/apps'
import ResetModal from 'modules/top_fans/components/ResetModal'
import { getCurrentAppByState } from 'selectors/apps'
import { 
	fetchTopFansEntities, 
	fetchTopFansSettings, 
	cleanupTopFansEntities, 
	resetTopFansEntities, 
	pollTopFansEntities,
} from 'modules/top_fans/actions/entities'
import { editAppSpecificSettings } from 'modules/top_fans/actions'

const ResetModalContainer = props => <ResetModal { ...props } />

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentAppByState(state)
	return { 
		show: true,
		firstFetchFromDate: currentApp.setting.firstFetchFromDate ? moment(currentApp.setting.firstFetchFromDate) : null,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleClose: () => dispatch(goBack()),
		onDateChange: date => {
			dispatch(editAppSpecificSettings(date.format()))
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
					dispatch(goBack())
				})
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetModalContainer)