import React from 'react'
import { connect } from 'react-redux'
import Flyer from 'canvas/fan_gate/components/Flyer'

const FlyerContainer = props => <Flyer {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(FlyerContainer)