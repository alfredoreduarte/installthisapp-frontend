import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Loading from 'containers/Loading'
import { removeAlert } from 'actions/alerts'

const Application = ({ children, loaded, alertTitle, alertContent, handleAlertDismiss }) => (
	<div>
		<Loading />
		{alertTitle ? 
		<Alert bsStyle="warning" onDismiss={handleAlertDismiss} style={{textAlign: 'center'}}>
			<strong dangerouslySetInnerHTML={{ __html: alertTitle }}></strong> <span dangerouslySetInnerHTML={{ __html: alertContent }}></span>
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

const mapDispatchToProps = dispatch => ({
	handleAlertDismiss: () => dispatch(removeAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)