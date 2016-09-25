import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import App from 'components/App'

const AppGrid = ({ apps }) => (
	<div>
		{apps.map( a => <App 
			key={a.checksum} 
			gridSize="3" 
			title={a.title} 
			applicationType={a.applicationType}
			id={a.id}
			facebookPageIdentifier={a.fbPage.identifier}
			checksum={a.checksum} 
			updatedOn={a.updatedOn} 
			status={a.status} />)}
	</div>
)

export default AppGrid