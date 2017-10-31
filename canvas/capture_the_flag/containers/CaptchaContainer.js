import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/capture_the_flag/selectors/entries'
import Captcha from 'canvas/capture_the_flag/components/Captcha'

const CaptchaContainer = props => <Captcha {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	entries: getFilteredEntries(state),
})

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptchaContainer)
