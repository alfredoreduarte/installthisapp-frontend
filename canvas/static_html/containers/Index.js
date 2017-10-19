import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredEntries } from 'canvas/static_html/selectors/entries'
import Loading from 'canvas/static_html/components/Loading'
import IndexView from 'canvas/static_html/components/Index'

const Index = ({ 
	messages,
	images,
	entries,
}) => (
	<IndexView headerImage={images.header} footerImage={images.footer} entries={entries} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Index)