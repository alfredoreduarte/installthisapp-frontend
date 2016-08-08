import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppGrid from 'containers/AppGrid'
import AppNavBar from 'components/AppNavBar'
import DashboardTitleBar from 'components/DashboardTitleBar'
import AppCreateModal from 'containers/AppCreateModal'
import AppDeleteModal from 'components/AppDeleteModal'
import { getAppToBeDeleted } from 'selectors/apps'
import { setAppToDelete } from 'actions/deleteApp'
import { deleteApp, postDeleteApp } from 'actions/apps'

const AdminDashboard = ({ 
	showCreateModal,
	showDeleteModal,
	appToBeDeleted,
	cancelAppDeletion,
	proceedWithAppDeletion,
	step
}) => (
	<div>
		<AppNavBar />
		<DashboardTitleBar />
		<AppGrid />
		<AppCreateModal show={showCreateModal} step={step} />
		<AppDeleteModal 
			show={showDeleteModal}
			app={appToBeDeleted}
			cancel={cancelAppDeletion}
			proceed={proceedWithAppDeletion} />
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		showCreateModal: props.location.pathname.indexOf('/d/apps/create') !== -1,
		showDeleteModal: state.deleteApp.checksum ? true: false,
		appToBeDeleted: state.deleteApp.checksum ? getAppToBeDeleted(state, props) : {},
		step: props.params.step ? props.params.step : 1
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		cancelAppDeletion: () => dispatch(setAppToDelete(null)),
		proceedWithAppDeletion: checksum => {
			dispatch(deleteApp(checksum))
			dispatch(postDeleteApp(checksum))
			dispatch(setAppToDelete(null))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)