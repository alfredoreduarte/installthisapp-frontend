import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Loading from 'containers/Loading'
import { removeAlert } from 'actions/alerts'

import Card from 'containers/Card'
import CardOverlay from 'containers/CardOverlay'

const Application = ({ adminId, trialOffer, children, global, loaded, alertTitle, alertContent, handleAlertDismiss }) => (
	<div>
		{trialOffer ?
			<div> 
				{adminId % 2 == 0 ? <Card /> : <CardOverlay />}
			</div>
		:
			null
		}
		<Loading active={global} />
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

const mapStateToProps = (state, props) => {
	if (props.location.query["trial-offer"]) {
		analytics.track('Trial Offer Viewed')
	}
	return { 
		global: state.activityIndicators.globalIndicator,
		loaded: state.admin.email ? true : false,
		alertTitle: state.alerts.title,
		alertContent: state.alerts.content,
		adminId: state.admin.id,
		trialOffer: props.location.query["trial-offer"],
	}
}

const mapDispatchToProps = dispatch => ({
	handleAlertDismiss: () => dispatch(removeAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)