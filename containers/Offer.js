import React from 'react'
import { connect } from 'react-redux'
import { getBasicPlanIfExists } from 'selectors/plans'

import Card from 'containers/Card'
import CardOverlay from 'containers/CardOverlay'
import CardHalfForever from 'containers/CardHalfForever'
import CardTrialEnded from 'containers/CardTrialEnded'
import CardAppLimit from 'containers/CardAppLimit'

const Offer = ({ 
	type,
	busy,
	plan,
	onSuccess,
}) => 
{
	switch (type) {
		case 'half-forever': 		return <CardHalfForever busy={busy} plan={plan} onSuccess={onSuccess} />
		case 'starter': 			return <CardOverlay 	busy={busy} plan={plan} onSuccess={onSuccess} />
		case 'trial-ended': 		return <CardTrialEnded 	busy={busy} plan={plan} onSuccess={onSuccess} />
		case 'app-limit-reached': 	return <CardAppLimit 	busy={busy} plan={plan} onSuccess={onSuccess} />
		default: null
	}
}

const mapStateToProps = (state, props) => ({
	busy: state.activityIndicators.purchasing,
	plan: getBasicPlanIfExists(state),
})

const mapDispatchToProps = (dispatch, props) => ({
	onSuccess: () => {
		// analytics.track('Trial Offer Purchased') // OLD
		analytics.track('Offer Purchased', {
			type: props.type
		}, () => {
			top.location = location.protocol + '//' + window.location.host + '/d?successful-purchase=true'
		})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Offer)