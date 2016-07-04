import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import App from '../components/App'
import { getAllApps } from '../selectors/app'

const AppGrid = ({ apps }) => (
	<div>
		{apps.map( a => <App gridSize="3" title={a.title} type={a.type} checksum={a.checksum} installed={a.active} />)}
	</div>
)

const mapStateToProps = (state) => {
	return { 
		apps: _.values(getAllApps(state)) // Convert an object containing apps into an array
	}
}

export default connect(mapStateToProps)(AppGrid);