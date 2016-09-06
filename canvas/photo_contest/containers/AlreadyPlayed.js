import React from 'react'
import { connect } from 'react-redux'
import Message from 'canvas/photo_contest/components/Message'

const AlreadyPlayed = ({ title, foot }) => <Message title={title} foot={foot} />

const mapStateToProps = state => ({
	title: state.messages.alreadyPlayed,
	foot: null,
})

export default connect(mapStateToProps)(AlreadyPlayed)