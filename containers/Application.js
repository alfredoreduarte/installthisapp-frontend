import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Application = ({ children, loaded }) => (
	<div className="container-fluid">
		{loaded ? children : 'cargando'}
	</div>
)

const mapStateToProps = state => {
	return { 
		loaded: state.admin.name ? true : false
	}
}

export default connect(mapStateToProps)(Application)