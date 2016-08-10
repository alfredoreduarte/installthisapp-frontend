import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import StatusIndicator from 'components/StatusIndicator'
import { setAppToDelete } from 'actions/deleteApp'
import FbPhoto from 'components/FbPhoto'

const App = ({ 
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
		<div className="panel panel-default ita-panel-screen">
			<div className="panel-body">
				<div className="ita-panel-overlay">
					<br />
					<br />
					<br />
					<Link to={`/d/apps/${applicationType}/${checksum}`} className="btn btn-white btn-outline">
						Go To Dashboard
					</Link>
					<br/>
					<br/>
					<button className="btn btn-white btn-outline btn-xs" onClick={() => handleDeleteRequest(checksum)}>
						Delete
					</button>
				</div>
				<FbPhoto identifier={facebookPageIdentifier} />
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
				<small>{applicationType}</small>
			</div>
		</div>
	</div>
)

const mapDispatchToProps = (dispatch, ownProps) => {
	return { 
		handleDeleteRequest: checksum => {
			console.log('app to delete!', checksum)
			dispatch(setAppToDelete(checksum))
		}
	}
}

export default connect(undefined, mapDispatchToProps)(App)