import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import AppGrid from 'containers/AppGrid'
import Card from 'containers/Card'
import CardOverlay from 'containers/CardOverlay'
import AppNavBar from 'components/AppNavBar'
import DashboardTitleBar from 'components/DashboardTitleBar'
import SuccessfulPurchase from 'components/SuccessfulPurchase'
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
	successfulPurchase,
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
		<ol>
			<li>Connect with Facebook</li>
			<li>Add a destination</li>
			<li>Select a Source: Page, ad, destination</li>
		</ol>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		successfulPurchase: props.location.query["successful-purchase"],
	}
}
const mapDispatchToProps = (dispatch, props) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)