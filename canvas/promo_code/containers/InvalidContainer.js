import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/promo_code/selectors/entries'
import Invalid from 'canvas/promo_code/components/Invalid'

const InvalidContainer = props => <Invalid {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
})

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(InvalidContainer)
