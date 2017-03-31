import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import ThanksView from 'canvas/memory_match/components/Thanks'
import { getElapsedTime } from 'canvas/memory_match/selectors/time'

const Thanks = ({ 
	messages,
	images,
	userName,
	userIdentifier,
	clicks,
	time,
}) => (
	<ThanksView 
		headerImage={images.header}
		footerImage={images.footer}
		thanksMessage={messages.thanksMessage}
		userName={userName}
		userIdentifier={userIdentifier}
		clicks={clicks}
		time={time}
	/>
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	// time: getElapsedTime(state),
	time: "00:20",
	// clicks: state.game.clickCount,
	clicks: 23,
	// userName: state.loggedUser.name,
	userName: 'Alfredo Re',
	// userIdentifier: state.loggedUser.identifier,
	userIdentifier: "10208910337057839",
})

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Thanks)