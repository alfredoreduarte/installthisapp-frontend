import React from 'react'
import { connect } from 'react-redux'
import AlreadyPlayedView from 'canvas/trivia/components/AlreadyPlayed'

const AlreadyPlayed = ({ title, foot }) => <p>hola</p>

const mapStateToProps = state => ({
	title: state.messages.alreadyPlayed,
	foot: null,
})

export default connect(mapStateToProps)(AlreadyPlayed)