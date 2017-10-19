import React from 'react'
import { connect } from 'react-redux'
import Welcome from 'canvas/coupons/components/Welcome'
import { digestFacebookResponse } from 'canvas/coupons/actions/user'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
	isPreview: false,
})

const mapDispatchToProps = dispatch => ({
	handleLogin: e => dispatch(digestFacebookResponse(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)