import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import App from 'components/App'
import { getAllAppsByText } from 'selectors/apps'

const AppGrid = ({ apps }) => (
	<div>
		{apps.map( a => <App key={a.checksum} gridSize="3" title={a.title} type={a.type} checksum={a.checksum} installed={a.active} />)}
	</div>
)

const mapStateToProps = (state, props) => {
	return { 
		apps: getAllAppsByText(state, props) // Convert an object containing apps into an array
	}
}

export default connect(mapStateToProps)(AppGrid);