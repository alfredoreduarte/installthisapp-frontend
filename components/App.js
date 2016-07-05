import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import StatusIndicator from 'components/StatusIndicator'

const App = ({ 
	gridSize,
	installed,
	title,
	type,
	checksum,
	updatedOn 
}) => (
	<div className={`col-md-${gridSize}`}>
		<div className="panel panel-default ita-panel-screen">
			<div className="panel-body">
				<div className="ita-panel-overlay">
					<br />
					<br />
					<br />
					<Link to={`/apps/${checksum}`} className="btn btn-white btn-outline">
						Go To Dashboard
					</Link>
					<br/>
					<br/>
					<Link to="/" className="btn btn-white btn-outline btn-xs">
						Delete
					</Link>
				</div>
				<img src="/images/user.jpg" />
			</div>
			<div className="panel-footer text-center">
				<StatusIndicator active={true} />{' '}
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
				<small>{type}</small>
			</div>
		</div>
	</div>
)

export default App