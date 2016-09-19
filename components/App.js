import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Spinner from 'react-spinkit'
import StatusIndicator from 'components/StatusIndicator'
import { setAppToDelete } from 'actions/deleteApp'
import { turnOnActivityLoadingApp, turnOffActivityLoadingApp } from 'actions/activityIndicators'
import FbPhoto from 'components/FbPhoto'

const App = ({ 
	loadingDashboard,
	otherAppsLoading,
	toggleLoading,
	gridSize,
	status,
	title,
	applicationType,
	facebookPageIdentifier,
	id,
	checksum,
	updatedOn,
	handleDeleteRequest 
}) => (
	<div className={`col-md-${gridSize}`}>
		<div 
			className={`panel panel-default ita-panel-screen ${otherAppsLoading ? 'greyed-out' : ''}`}>
			<div className="panel-body">
				<FbPhoto identifier={facebookPageIdentifier} />
				{loadingDashboard ? 
					<div className="ita-panel-overlay-spinner">
						<Spinner spinnerName="circle" noFadeIn={true} />
					</div>
				:
				<div className="ita-panel-overlay">
					<br />
					<br />
					<br />
					<Link 
						to={`/d/apps/${applicationType}/${checksum}`} 
						onClick={toggleLoading}
						className="btn btn-white btn-outline">
						Go To Dashboard
					</Link>
					<br/>
					<br/>
					<button 
						className="btn btn-white btn-outline btn-xs" 
						onClick={() => handleDeleteRequest(checksum)}>
						Delete
					</button>
				</div>
				}
			</div>
			<div className="panel-footer text-center">
				<StatusIndicator active={status == 'installed'} />{' '}
				<Link 
					to={`apps/${checksum}`} 
					className="
						h5 
						ita-panel-screen-title 
						text-relevant-title 
						weight-normal 
						font-size-large">
					{title}
				</Link>
				<br />
				<small 
					style={{fontSize: '10px'}}
					className="text-uppercase text-muted">
						<b>{applicationType.replace('_', ' ')}</b>
				</small>
			</div>
		</div>
	</div>
)

const mapStateToProps = (state, props) => {
	const appLoading = state.activityIndicators.appChecksumDashboardLoading
	const loadingDashboard = appLoading == props.checksum
	return { 
		otherAppsLoading: appLoading && !loadingDashboard,
		loadingDashboard,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return { 
		handleDeleteRequest: checksum => {
			dispatch(setAppToDelete(checksum))
		},
		toggleLoading: () => dispatch(turnOnActivityLoadingApp(ownProps.checksum)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)