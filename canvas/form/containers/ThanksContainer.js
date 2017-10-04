import React from 'react'
import { connect } from 'react-redux'
import Thanks from 'canvas/form/components/Thanks'

const ThanksContainer = props => <Thanks {...props} />

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	settings: {...state.settings},
})

const mapDispatchToProps = dispatch => ({
	
})

export default connect(mapStateToProps, mapDispatchToProps)(ThanksContainer)