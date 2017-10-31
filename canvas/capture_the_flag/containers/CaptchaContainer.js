import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/capture_the_flag/selectors/entries'
import { clickCaptcha } from 'canvas/capture_the_flag/actions/flag'
import Captcha from 'canvas/capture_the_flag/components/Captcha'

const CaptchaContainer = props => <Captcha {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	entries: getFilteredEntries(state),
	shuffledCaptcha: [state.images.captcha.incorrect[0], state.images.captcha.correct, state.images.captcha.incorrect[1]],
})

const mapDispatchToProps = dispatch => {
	return {
		claim: src => dispatch(clickCaptcha(src)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaContainer)
