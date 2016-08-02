import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import App from 'components/App'
import { getAllAppsByText } from 'selectors/apps'

const AppGrid = ({ apps }) => (
	<div>
		{apps.map( a => <App 
			key={a.checksum} 
			gridSize="3" 
			title={a.title} 
			applicationType={a.applicationType}
			id={a.id}
			facebookPageIdentifier={a.facebookPageIdentifier}
			checksum={a.checksum} 
			updatedOn={a.updatedOn} 
			status={a.status} />)}
	</div>
)

const mapStateToProps = (state, props) => {
	const apps = getAllAppsByText(state, props)
	return { 
		apps
	}
}

export default connect(mapStateToProps)(AppGrid)