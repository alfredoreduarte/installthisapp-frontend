import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Application = ({ children, loaded }) => (
	<div className="container-fluid">
		{loaded ? children : 'cargando'}
	</div>
)

const mapStateToProps = ({ adminUser }) => {
	return { 
		loaded: adminUser.name ? true : false
	}
};

export default connect(mapStateToProps)(Application);