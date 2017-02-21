import React from 'react'
import { connect } from 'react-redux'
import ThanksView from 'canvas/trivia/components/Thanks'

const Thanks = ({ title, foot }) => <ThanksView title={title} foot={foot} />

const mapStateToProps = state => ({
	title: state.messages.thankYou,
	foot: null,
})

export default connect(mapStateToProps)(Thanks)