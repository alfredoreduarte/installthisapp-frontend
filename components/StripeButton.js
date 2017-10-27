import React from 'react'
import { connect } from 'react-redux'
import { postToApi } from 'api'
import StripeCheckout from 'react-stripe-checkout'
import { purchase } from 'actions/billing'

const TakeMoney = ({ email, planId, hasCustomer, onToken, children }) => (
	<StripeCheckout
		token={token => onToken(token, planId, hasCustomer)}
		image="https://stripe.com/img/documentation/checkout/marketplace.png"
		email={email}
		locale="auto"
		stripeKey={window.stripeKey}>
		<button className="btn btn-primary hide">
			{null} - ${null} / month
		</button>
		{children}
	</StripeCheckout>
)

const mapStateToProps = state => ({
	email: state.admin.email,
	hasCustomer: state.admin.customer,
})

const mapDispatchToProps = (dispatch, props) => ({
	onToken: (token, planId, hasCustomer) => dispatch(purchase(token, planId, hasCustomer, props.onSuccess, props.couponCode)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney)
