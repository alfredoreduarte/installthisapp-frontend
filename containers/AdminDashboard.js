import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import AppGrid from 'containers/AppGrid'
import AppNavBar from 'components/AppNavBar'
import DashboardTitleBar from 'components/DashboardTitleBar'
import DashboardToolBar from 'components/DashboardToolBar'
import AdminDashboardEmpty from 'components/AdminDashboardEmpty'
import NoAppsMatching from 'components/NoAppsMatching'
import AppCreateModal from 'containers/AppCreateModal'
import AppDeleteModal from 'components/AppDeleteModal'
import { getAppToBeDeleted, getAllAppsByText } from 'selectors/apps'
import { setAppToDelete } from 'actions/deleteApp'
import { deleteApp, destroy } from 'actions/apps'

const AdminDashboard = ({ 
	apps,
	filterText,
	showCreateModal,
	showDeleteModal,
	appToBeDeleted,
	cancelAppDeletion,
	proceedWithAppDeletion,
	appCreateModalHandleClose,
	step
}) => (
	<div>
		<AppNavBar />
		{apps.length > 0 || filterText ? 
			<div>
				<DashboardTitleBar />
				{apps.length > 0 ? <AppGrid apps={apps} /> : <NoAppsMatching />}
			</div>
		: 
			<AdminDashboardEmpty />
		}
		<AppCreateModal show={showCreateModal} step={step} handleClose={appCreateModalHandleClose} />
		<AppDeleteModal 
			show={showDeleteModal}
			app={appToBeDeleted}
			cancel={cancelAppDeletion}
			proceed={proceedWithAppDeletion} />
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		apps: getAllAppsByText(state, props),
		filterText: state.filterText,
		showCreateModal: props.location.pathname.indexOf('/d/apps/create') !== -1,
		showDeleteModal: state.deleteApp.checksum ? true: false,
		appToBeDeleted: state.deleteApp.checksum ? getAppToBeDeleted(state, props) : {},
		step: props.params.step || 1
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		cancelAppDeletion: () => dispatch(setAppToDelete(null)),
		proceedWithAppDeletion: checksum => {
			dispatch(destroy(checksum))
			dispatch(setAppToDelete(null))
		},
		appCreateModalHandleClose: () => {
			dispatch(push('/d'))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)