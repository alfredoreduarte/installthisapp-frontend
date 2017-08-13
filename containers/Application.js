import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Loading from 'containers/Loading'
import AppNavBar from 'components/AppNavBar'
import { removeAlert } from 'actions/alerts'
import { possibleOffers } from 'lib/offers'

import Offer from 'containers/Offer'

const Application = ({ adminId, offer, children, global, loaded, alertTitle, alertContent, handleAlertDismiss }) => (
	<div>
		{offer ? <Offer type={offer} /> : null}
		<Loading active={global} />
		{alertTitle ? 
		<Alert bsStyle="warning" onDismiss={handleAlertDismiss} style={{textAlign: 'center'}}>
			<strong dangerouslySetInnerHTML={{ __html: alertTitle }}></strong> <span dangerouslySetInnerHTML={{ __html: alertContent }}></span>
		</Alert>
		: null }
		<div className="container-flui">
			{loaded ? children : 'cargando'}
		</div>
	</div>
)

const shouldShowOffer = param => possibleOffers.indexOf(param) >= 0 ? param : false

const mapStateToProps = (state, props) => {
	const showingOffer = shouldShowOffer(props.location.query["offer"])
	return { 
		global: state.activityIndicators.globalIndicator,
		loaded: state.admin.email ? true : false,
		alertTitle: state.alerts.title,
		alertContent: state.alerts.content,
		adminId: state.admin.id,
		offer: showingOffer,
	}
}

const mapDispatchToProps = dispatch => ({
	handleAlertDismiss: () => dispatch(removeAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)