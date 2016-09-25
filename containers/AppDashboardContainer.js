import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'
import AppNavBar from 'components/AppNavBar'
import AppTitleBar from 'components/AppTitleBar'
import Sidebar from 'components/Sidebar'
import { install, uninstall, toggleAppInstalling, toggleAppUninstalling } from 'actions/apps'
import { turnOffActivityCreatingApp, turnOffActivityLoadingApp } from 'actions/activityIndicators'
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
	const fbAppId = currentApp.fbApplication ? currentApp.fbApplication.appId : null
	const fbAppCanvasId = currentApp.fbApplication ? currentApp.fbApplication.canvasId : null
	return { 
		facebookPageIdentifier: state.entities.pages[currentApp.fbPageId].identifier,
		fbAppId,
		fbAppCanvasId,
		currentApp,
		checksum: props.params.checksum,
		type: props.params.type,
		status: currentApp.status,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	dispatch(turnOffActivityCreatingApp())
	dispatch(turnOffActivityLoadingApp())
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