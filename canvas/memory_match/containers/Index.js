import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getFilteredCards } from 'canvas/memory_match/selectors/cards'
import Loading from 'canvas/memory_match/components/Loading'
import IndexView from 'canvas/memory_match/components/Index'
import { flipCard, tickTime } from 'canvas/memory_match/actions/game'
import { getElapsedTime } from 'canvas/memory_match/selectors/time'

const Index = ({ 
	messages,
	images,
	cards,
	onCardFlip,
	currentTime,
	clickCount,
	flippedCard,
	matchedIds,
	finished,
}) => (
	<IndexView 
		headerImage={images.header}
		footerImage={images.footer}
		onCardFlip={onCardFlip}
		cardBack={images.cardBack}
		cards={cards}
		currentTime={currentTime}
		matchedIds={matchedIds}
		clickCount={clickCount}
		flippedCard={flippedCard}
		finished={finished}
	/>
)

const mapStateToProps = state => ({
	messages: {...state.messages},
	images: {...state.images},
	cards: getFilteredCards(state),
	currentTime: getElapsedTime(state),
	flippedCard: state.game.flippedCard,
	clickCount: state.game.clickCount,
	matchedIds: state.game.matchedIds,
	finished: state.game.finished,
})

const mapDispatchToProps = dispatch => {
	return {
		onCardFlip: (uniqueIdentifier, id) => {
			dispatch(flipCard(uniqueIdentifier, id))
			// dispatch(tickTime())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)