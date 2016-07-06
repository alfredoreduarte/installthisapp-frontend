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
			type={a.type} 
			checksum={a.checksum} 
			updatedOn={a.updatedOn} 
			status={a.status} />)}
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		apps: getAllAppsByText(state, props)
	}
}

export default connect(mapStateToProps)(AppGrid)