import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredCards } from 'canvas/memory_match/selectors/cards'
import Loading from 'canvas/memory_match/components/Loading'
import IndexView from 'canvas/memory_match/components/Index'

const Index = ({ 
	messages,
	images,
	cards,
}) => (
	<IndexView headerImage={images.header} footerImage={images.footer} cardBack={images.cardBack} cards={cards} />
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	cards: getFilteredCards(state),
})

const mapDispatchToProps = dispatch => {
	return {
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)