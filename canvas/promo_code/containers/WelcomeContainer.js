import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Welcome from 'canvas/promo_code/components/Welcome'
import { digestFacebookResponse } from 'canvas/promo_code/actions/user'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
})

const mapDispatchToProps = dispatch => ({
	handleLogin: e =>
		dispatch(digestFacebookResponse(e)).then(() => {
			return dispatch(push(`/promo_code/${window.checksum}/form`))
		}),
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
