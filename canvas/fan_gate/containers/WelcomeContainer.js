import React from 'react'
import { connect } from 'react-redux'
import Welcome from 'canvas/fan_gate/components/Welcome'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)