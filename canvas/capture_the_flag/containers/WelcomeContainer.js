import React from 'react'
import { connect } from 'react-redux'
import Welcome from 'canvas/capture_the_flag/components/Welcome'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	nextPath: `/capture_the_flag/${window.checksum}/main-screen`,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
