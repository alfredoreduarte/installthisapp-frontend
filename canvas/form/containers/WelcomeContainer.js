import React from 'react'
import { connect } from 'react-redux'
import Welcome from 'canvas/form/components/Welcome'

const WelcomeContainer = props => <Welcome {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
	formPath: `/form/${window.checksum}/form`,
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)