import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Loading from 'containers/Loading'

const Application = ({ children, loaded }) => (
	<div>
		<Loading />
		<div className="container-fluid">
			{loaded ? children : 'cargando'}
		</div>
	</div>
)

const mapStateToProps = state => {
	return { 
		loaded: state.admin.email ? true : false
	}
}

export default connect(mapStateToProps)(Application)