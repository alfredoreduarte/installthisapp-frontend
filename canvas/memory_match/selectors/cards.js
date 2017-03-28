import _ from 'lodash'
import v4 from 'node-uuid'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getAllCards = state => _.values(state.entities.cards)

let shuffleOnce = []
export const getFilteredCards = createSelector(
	getAllCards,
	cards => {
		if (shuffleOnce.length == 0) {
			cards.map(card => {
				shuffleOnce.push({
					...card,
					fakeUniqueId: v4()
				})
				shuffleOnce.push({
					...card,
					fakeUniqueId: v4()
				})
			})
			shuffleOnce = _.shuffle(shuffleOnce)
		}
		return shuffleOnce
	}
)