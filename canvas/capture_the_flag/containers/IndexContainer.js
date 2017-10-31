import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/capture_the_flag/selectors/entries'
import Index from 'canvas/capture_the_flag/components/Index'

const IndexContainer = props => <Index {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	entries: getFilteredEntries(state),
})

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
