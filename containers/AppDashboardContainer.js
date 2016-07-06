import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'
import AppNavBar from 'components/AppNavBar'
import AppTitleBar from 'components/AppTitleBar'
import Sidebar from 'components/Sidebar'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const AppDashboardContainer = ({ children, currentApp, checksum }) => (
	<div>
		<AppNavBar />
		<AppTitleBar title={currentApp.title} status={currentApp.status} scheduled={currentApp.scheduled} />
		<Sidebar checksum={checksum} />
		<DashboardContentDecorator>
			{children}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props)
	return { 
		currentApp: currentApp ? currentApp : {},
		checksum: props.params.checksum
	}
}

export default connect(mapStateToProps)(AppDashboardContainer)