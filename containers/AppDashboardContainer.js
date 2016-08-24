import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'
import AppNavBar from 'components/AppNavBar'
import AppTitleBar from 'components/AppTitleBar'
import Sidebar from 'components/Sidebar'
import { setCurrentAppChecksum, install, uninstall, toggleAppInstalling, toggleAppUninstalling } from 'actions/apps'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const AppDashboardContainer = ({ 
	children, 
	currentApp, 
	checksum, 
	main, 
	sidebar, 
	type, 
	facebookPageIdentifier, 
	fbAppId,
	fbAppCanvasId,
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
		<Sidebar 
			checksum={checksum} 
			type={type} 
			facebookPageIdentifier={facebookPageIdentifier}
			fbAppId={fbAppId} 
			fbAppCanvasId={fbAppCanvasId} 
			installed={currentApp.status == 'installed'}>
			{sidebar}
		</Sidebar>
		<DashboardContentDecorator>
			{children ? children : main}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props)
	let appId
	let canvasId
	if (currentApp) {
		if (currentApp.fbApplication) {
			appId = currentApp.fbApplication.appId || null
			canvasId = currentApp.fbApplication.canvasId || null
		}
	}
	return { 
		facebookPageIdentifier: currentApp ? currentApp.facebookPageIdentifier : '',
		fbAppId: appId,
		fbAppCanvasId: canvasId,
		currentApp: currentApp ? currentApp : {},
		checksum: props.params.checksum,
		type: props.params.type,
		status: currentApp ? currentApp.status : 'ready',
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(setCurrentAppChecksum(props.params.checksum))
	return {
		handleInstall: () => {
			dispatch(toggleAppInstalling(props.params.checksum))
			dispatch(install(props.params.checksum))
		},
		handleUninstall: () => {
			dispatch(toggleAppUninstalling(props.params.checksum))
			dispatch(uninstall(props.params.checksum))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDashboardContainer)