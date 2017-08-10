import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { fetchAdmin } from 'actions/admin'
import { fetchFbLeadforms } from 'leadgen/actions/fbLeadforms'
import { possibleOffers } from 'lib/offers'

const shouldTrackOffer = param => {
	if ( possibleOffers.indexOf(param) >= 0 ) {
		analytics.track('Offer Viewed', {
			type: param
		})
		return param
	}
	return false
}

export const createRoutes = (store, dispatch) => ({
	path: '/leadgen',
	component: require('leadgen/containers/Application').default,
	indexRoute: {
		component: require('leadgen/containers/AdminDashboard').default
	},
	onChange: (prevState, nextState, replace, next) => {
		if (nextState.location.pathname == '/leadgen') {
			dispatch(fetchAdmin()).then(() => {
				next()
			})
		}
		else{
			next()
		}
	},
	onEnter: (nextState, replace, next) => {
		analytics.page('Leads Dashboard')
		shouldTrackOffer(nextState.location.query["offer"])
		dispatch(fetchAdmin()).then(() => {
			// dispatch(fetchFbLeadforms()).then(() => next())
			next()
		})
	},
	childRoutes: [
		require('leadgen/routes/fbLeadDestination'),
	]
})