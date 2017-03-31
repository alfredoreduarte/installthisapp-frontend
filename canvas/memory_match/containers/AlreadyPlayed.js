import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredCards } from 'canvas/memory_match/selectors/cards'
import AlreadyPlayedView from 'canvas/memory_match/components/AlreadyPlayed'

const AlreadyPlayed = ({ 
	messages,
	images,
}) => (
	<AlreadyPlayedView 
		headerImage={images.header}
		footerImage={images.footer}
		alreadyPlayedMessage={messages.alreadyPlayedMessage}
	/>
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
})

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AlreadyPlayed)