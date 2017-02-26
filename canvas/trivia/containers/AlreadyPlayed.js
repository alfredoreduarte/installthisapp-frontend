import React from 'react'
import { connect } from 'react-redux'
import AlreadyPlayedView from 'canvas/trivia/components/AlreadyPlayed'

const AlreadyPlayed = props => <AlreadyPlayedView { ...props } />

const mapStateToProps = state => ({
	header: state.images.header,
	footer: state.images.footer,
	title: state.messages.alreadyPlayed,
	foot: null,
})

export default connect(mapStateToProps)(AlreadyPlayed)