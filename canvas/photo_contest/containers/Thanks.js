import React from 'react'
import { connect } from 'react-redux'
import Message from 'canvas/photo_contest/components/Message'

const Thanks = ({ title, foot }) => <Message title={title} foot={foot} />

const mapStateToProps = state => ({
	title: state.messages.thankYou,
	foot: null,
})

export default connect(mapStateToProps)(Thanks)