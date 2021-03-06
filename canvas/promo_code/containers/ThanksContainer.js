import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/promo_code/selectors/entries'
import Thanks from 'canvas/promo_code/components/Thanks'

const ThanksContainer = props => <Thanks {...props} />

const mapStateToProps = state => ({
	messages: { ...state.messages },
	images: { ...state.images },
	settings: { ...state.settings },
	entriesCount: state.applicationData.entriesCount,
})

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThanksContainer)
