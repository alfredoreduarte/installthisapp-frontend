import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Loading from 'containers/Loading'

const Application = ({ children, loaded, alertTitle, alertContent }) => (
	<div>
		<Loading />
		{alertTitle ? 
		<Alert bsStyle="warning">
			<strong>{alertTitle}</strong> {alertContent}
		</Alert>
		: null }
		<div className="container-fluid">
			{loaded ? children : 'cargando'}
		</div>
	</div>
)

const mapStateToProps = state => {
	return { 
		loaded: state.admin.email ? true : false,
		alertTitle: state.alerts.title,
		alertContent: state.alerts.content,
	}
}

export default connect(mapStateToProps)(Application)