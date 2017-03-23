import React from 'react'
import { connect } from 'react-redux'
import { getAllCards } from 'modules/memory_match/selectors/cards'
import { fetchEntities } from 'modules/memory_match/actions/entities'
import { createCard, deleteCard } from 'modules/memory_match/actions/cards'
import CardsView from 'modules/memory_match/components/Cards'

const Cards = ({
	cards,
	handleDelete,
	selectedItems,
	fetchCards,
	createCard,
}) => (
	<CardsView
		cards={cards}
		handleDelete={handleDelete}
		fetchCards={fetchCards}
		createCard={createCard}
		selectedItems={selectedItems}
	/>
)

const mapStateToProps = state => ({ 
	cards: getAllCards(state),
	selectedItems: state.selectedItems,
})

const mapDispatchToProps = (dispatch, props) => ({
	fetchCards: () => dispatch(fetchEntities()),
	handleDelete: id => dispatch(deleteCard(id)),
	createCard: (acceptedFiles, rejectedFiles) => dispatch(createCard(acceptedFiles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)