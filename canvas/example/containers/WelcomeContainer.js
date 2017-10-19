import React from 'react'
import { connect } from 'react-redux'
import Welcome from 'canvas/example/components/Welcome'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
	nextPath: `/form/${window.checksum}/main-screen`,
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)