import React from 'react'
import { connect } from 'react-redux'
import { postToApi } from 'api'
import StripeCheckout from 'react-stripe-checkout'
import { purchase } from 'actions/billing'

const TakeMoney = ({ email, planSlug, hasCustomer, onToken, children }) => (
	<StripeCheckout
		token={token => onToken(token, planSlug, hasCustomer)}
		image="https://stripe.com/img/documentation/checkout/marketplace.png"
		email={email}
		locale="auto"
		stripeKey="pk_test_m1qT4u49pPqliYXWOCCXMd6k"
	>
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

const mapDispatchToProps = dispatch => ({
	onToken: (token, plan, hasCustomer) => dispatch(purchase(token, plan, hasCustomer))
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney)