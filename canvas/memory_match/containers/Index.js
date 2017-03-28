import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredCards } from 'canvas/memory_match/selectors/cards'
import Loading from 'canvas/memory_match/components/Loading'
import IndexView from 'canvas/memory_match/components/Index'
import { flipCard } from 'canvas/memory_match/actions/game'
import { getCurrentTime } from 'canvas/memory_match/selectors/time'

const Index = ({ 
	messages,
	images,
	cards,
	onCardFlip,
	currentTime,
	clickCount,
	flippedCard,
	matchedIds,
}) => (
	<IndexView 
		headerImage={images.header}
		onCardFlip={onCardFlip}
		footerImage={images.footer}
		cardBack={images.cardBack}
		cards={cards}
		currentTime={currentTime}
		matchedIds={matchedIds}
		clickCount={clickCount}
		flippedCard={flippedCard}
	/>
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	cards: getFilteredCards(state),
	currentTime: getCurrentTime(state),
	flippedCard: state.game.flippedCard,
	clickCount: state.game.clickCount,
	matchedIds: state.game.matchedIds,
})

const mapDispatchToProps = dispatch => {
	return {
		onCardFlip: (uniqueIdentifier, id) => {
			dispatch(flipCard(uniqueIdentifier, id))
			console.log('flipped', id)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)