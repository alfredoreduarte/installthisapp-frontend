import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getAllCards = state => _.values(_.filter(state.memoryMatch.entities.cards, card => card.status != 'deleted'))