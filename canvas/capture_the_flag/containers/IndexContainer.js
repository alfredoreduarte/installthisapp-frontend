import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries, getCurrentWinner } from 'canvas/capture_the_flag/selectors/entries'
import { getTimer } from 'canvas/capture_the_flag/selectors/timer'
import { claim } from 'canvas/capture_the_flag/actions/flag'
import { digestFacebookResponse } from 'canvas/capture_the_flag/actions/user'
import Index from 'canvas/capture_the_flag/components/Index'

const IndexContainer = props => <Index {...props} />

const mapStateToProps = state => {
	const currentWinner = getCurrentWinner(state)
	let isItMe = false
	if (currentWinner && state.loggedUser.identifier) {
		if (currentWinner.user.identifier == state.loggedUser.identifier) {
			isItMe = true
		}
	}
	return {
		messages: { ...state.messages },
		images: { ...state.images },
		settings: { ...state.settings },
		entries: getFilteredEntries(state),
		currentWinner: currentWinner,
		logged: state.loggedUser.identifier,
		captchaPath: `/capture_the_flag/${window.checksum}/captcha`,
		isItMe: isItMe,
		timer: getTimer(state),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		claim: e =>
			dispatch(digestFacebookResponse(e)).then(() => {
				return dispatch(push(`/capture_the_flag/${window.checksum}/captcha`))
			}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
