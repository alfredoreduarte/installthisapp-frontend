import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'
import AppNavBar from 'components/AppNavBar'
import AppTitleBar from 'components/AppTitleBar'
import Sidebar from 'components/Sidebar'
import { install, uninstall } from 'actions/apps'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const AppDashboardContainer = ({ 
	children, 
	currentApp, 
	checksum, 
	main, 
	sidebar, 
	type, 
	facebookPageIdentifier, 
	handleInstall,
	handleUninstall,
}) => (
	<div>
		<AppNavBar />
		<AppTitleBar 
			facebookPageIdentifier={facebookPageIdentifier}
			title={currentApp.title} 
			status={currentApp.status} 
			scheduled={currentApp.scheduled}
			handleInstall={handleInstall}
			handleUninstall={handleUninstall} />
		<Sidebar checksum={checksum} type={type}>
			{sidebar}
		</Sidebar>
		<DashboardContentDecorator>
			{children ? children : main}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props)
	return { 
		facebookPageIdentifier: currentApp ? currentApp.facebookPageIdentifier : '',
		currentApp: currentApp ? currentApp : {},
		checksum: props.params.checksum,
		type: props.params.type,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		handleInstall: () => dispatch(install(props.params.checksum)),
		handleUninstall: () => dispatch(uninstall(props.params.checksum)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDashboardContainer)