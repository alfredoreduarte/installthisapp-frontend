import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppGrid from 'containers/AppGrid'
import AppNavBar from 'components/AppNavBar'
import DashboardTitleBar from 'components/DashboardTitleBar'
import AppCreateModal from 'containers/AppCreateModal'

const AdminDashboard = ({ showCreateModal, step }) => (
	<div>
		<AppNavBar />
		<DashboardTitleBar />
		<AppGrid />
		<AppCreateModal show={showCreateModal} step={step} />
	</div>
)

const mapStateToProps = (state, props) => {
	console.log(props)
	return { 
		showCreateModal: props.route.path && props.route.path.indexOf('create') !== -1,
		step: props.params.step ? props.params.step : 1
	}
}

export default connect(mapStateToProps)(AdminDashboard)