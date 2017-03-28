import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

export const getAllCards = state => _.values(state.memoryMatch.entities.cards)

export const getCardsForApp = createSelector(
	getAllCards,
	getCurrentAppByState,
	(cards, app) => {
		return _.filter(cards, card => {
			return card.status != 'deleted' && card.applicationId == app.id
		})
	}
)