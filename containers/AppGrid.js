import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'

const AppGrid = ({ apps }) => (
	<div>
		{apps.map( a => <App gridSize="3" title={a.title} type={a.type} checksum={a.checksum} installed={a.active} />)}
	</div>
)

const mapStateToProps = (state) => {
	return { 
		apps: state.apps
	}
}

export default connect(mapStateToProps)(AppGrid);