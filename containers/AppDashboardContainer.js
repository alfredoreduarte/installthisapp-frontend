import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCurrentApp } from 'selectors/apps'
import Modal from 'react-modal'
import { ShareButtons } from 'react-share'
import CopyToClipboard from 'react-copy-to-clipboard'
import AppNavBar from 'components/AppNavBar'
import AppTitleBar from 'components/AppTitleBar'
import Sidebar from 'components/Sidebar'
import { install, uninstall, toggleAppInstalling, toggleAppUninstalling } from 'actions/apps'
import { toggleCopyShareLink, toggleShareModal } from 'actions/applicationData'
// import { turnOffActivityCreatingApp, turnOffActivityLoadingApp } from 'actions/activityIndicators'
import DashboardContentDecorator from 'containers/DashboardContentDecorator'

const {
  FacebookShareButton,
  TwitterShareButton,
} = ShareButtons;

const AppDashboardContainer = ({ 
	children, 
	currentApp, 
	checksum, 
	main, 
	secondary,
	sidebar, 
	applicationType, 
	// facebookPageIdentifier, 
	fbAppId,
	fbAppCanvasId,
	handleInstall,
	handleUninstall,
	// Sharing
	shareLinkCopied,
	shareModalShown,
	closeShareModal,
	onShareLinkCopy,
}) => (
	<div>
		<Modal
			isOpen={shareModalShown}
			onAfterOpen={() => console.log('afteropen')}
			onRequestClose={() => console.log('request close')}
			contentLabel="Modal"
			style={{
				content: {
					top: '100px',
					right: '100px',
					bottom: '100px',
					left: '100px',
				}
			}}
		>
			<a href="javascript:void(0)" onClick={() => closeShareModal()}><small>← back</small></a>
			<div className="page-header">
				<h1 className="text-center">Sharing your app</h1>
			</div>
			<p className="text-center">Use this link to share your app everywhere</p>
			<div className="col-md-6 col-md-offset-3">
				<CopyToClipboard
					className="form-control input-lg"
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
					text={`https://${window.location.host}/${currentApp.fbApplication.canvasId}/${currentApp.checksum}`}
					onCopy={() => onShareLinkCopy()}
					>
					<span>
						{`https://${window.location.host}/${currentApp.fbApplication.canvasId}/${currentApp.checksum}`}
						<span style={{
							display: 'inline-block',
							padding: '4px 10px 0px',
							background: shareLinkCopied ? '#62B142' : 'gray',
							color: 'white',
							borderRadius: '3px',
							fontSize: '11px',
							textTransform: 'uppercase',
							cursor: 'pointer',
							marginRight: '10px',
						}}>{shareLinkCopied ? 'Copied!' : 'Click to copy'}</span>
					</span>
				</CopyToClipboard>
				<br/>
				<FacebookShareButton className="btn btn-fb btn-block" url={`https://${window.location.host}/${currentApp.fbApplication.canvasId}/${currentApp.checksum}`}>Share on Facebook</FacebookShareButton>
				<br/>
				<TwitterShareButton className="btn btn-tw btn-block" url={`https://${window.location.host}/${currentApp.fbApplication.canvasId}/${currentApp.checksum}`}>Share on Twitter</TwitterShareButton>
			</div>
		</Modal>
		<AppNavBar />
		<AppTitleBar 
			// facebookPageIdentifier={facebookPageIdentifier}
			handleShare={closeShareModal}
			applicationType={applicationType}
			title={currentApp.title} 
			status={currentApp.status} 
			scheduled={currentApp.scheduled}
			handleInstall={handleInstall}
			handleUninstall={handleUninstall} />
		<Sidebar 
			checksum={checksum} 
			type={applicationType} 
			// facebookPageIdentifier={facebookPageIdentifier}
			fbAppId={fbAppId}
			fbAppCanvasId={fbAppCanvasId} 
			installed={currentApp.status == 'installed'}>
			{sidebar}
		</Sidebar>
		<DashboardContentDecorator>
			{children ? children : main}
			{secondary ? secondary : null}
		</DashboardContentDecorator>
	</div>
)

const mapStateToProps = (state, props) => {
	const currentApp = getCurrentApp(state, props)
	const fbAppId = currentApp.fbApplication ? currentApp.fbApplication.appId : null
	const fbAppCanvasId = currentApp.fbApplication ? currentApp.fbApplication.canvasId : null
	return { 
		// facebookPageIdentifier: state.entities.pages[currentApp.fbPageId].identifier,
		shareLinkCopied: state.applicationData.shareLinkCopied,
		shareModalShown: state.applicationData.shareModalShown,
		fbAppId,
		fbAppCanvasId,
		currentApp,
		checksum: props.params.checksum,
		applicationType: props.params.type,
		status: currentApp.status,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	// dispatch(turnOffActivityCreatingApp())
	// dispatch(turnOffActivityLoadingApp())
	return {
		handleInstall: () => {
			dispatch(toggleAppInstalling(props.params.checksum))
			dispatch(install(props.params.checksum))
		},
		handleUninstall: () => {
			dispatch(toggleAppUninstalling(props.params.checksum))
			dispatch(uninstall(props.params.checksum))
		},
		closeShareModal: () => {
			dispatch(toggleShareModal())
		},
		onShareLinkCopy: () => {
			dispatch(toggleCopyShareLink())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDashboardContainer)