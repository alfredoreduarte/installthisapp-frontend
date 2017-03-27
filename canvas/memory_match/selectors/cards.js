import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllCards = state => _.values(state.entities.cards)

export const getFilteredCards = createSelector(
	getAllCards,
	cards => {
		return _.filter(cards, card => card.id > 0)
	}
)