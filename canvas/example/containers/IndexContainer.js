import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/example/selectors/entries'
import Loading from 'canvas/example/components/Loading'
import Index from 'canvas/example/components/Index'

const IndexContainer = ({ 
	messages,
	images,
	entries,
}) => (
	<Index headerImage={images.header} footerImage={images.footer} entries={entries} />
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	entries: getFilteredEntries(state),
})

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)