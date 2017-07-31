import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Loading from 'containers/Loading'
import { removeAlert } from 'actions/alerts'
import { possibleOffers } from 'lib/offers'

import Offer from 'containers/Offer'

const Application = ({ children, globalIndicator, loaded, alertTitle, alertContent, handleAlertDismiss }) => (
	<div>
		{globalIndicator ? 
			<Loading active={globalIndicator} />
		: 
			<div className="container-fluid">{children}</div>
		}
	</div>
)

const shouldShowOffer = param => possibleOffers.indexOf(param) >= 0 ? param : false

const mapStateToProps = (state, props) => {
	const showingOffer = shouldShowOffer(props.location.query["offer"])
	return { 
		globalIndicator: state.activityIndicators.globalIndicator,
		loaded: state.admin.id,
	}
}

const mapDispatchToProps = dispatch => ({
	handleAlertDismiss: () => dispatch(removeAlert())
})

export default connect(mapStateToProps, mapDispatchToProps)(Application)