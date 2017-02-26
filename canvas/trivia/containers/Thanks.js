import React from 'react'
import { connect } from 'react-redux'
import ThanksView from 'canvas/trivia/components/Thanks'

const Thanks = props => <ThanksView { ...props } />

const mapStateToProps = state => ({
	header: state.images.header,
	footer: state.images.footer,
	title: state.messages.thankYou,
	foot: null,
})

export default connect(mapStateToProps)(Thanks)