import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from '../selectors/app'
import AppNavBar from '../components/AppNavBar'
import AppTitleBar from '../components/AppTitleBar'
import Sidebar from '../components/Sidebar'
import DashboardContentDecorator from '../containers/DashboardContentDecorator'

const AppDashboardContainer = ({ children, currentApp }) => (
	<div>
		<AppNavBar />
		<AppTitleBar title={currentApp.title} installed={currentApp.active} scheduled={currentApp.scheduled} />
		<Sidebar />
		<DashboardContentDecorator>
			{children}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props)
	return { 
		currentApp: currentApp ? currentApp : {}
	}
}

export default connect(mapStateToProps)(AppDashboardContainer)