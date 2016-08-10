import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

export const getAllOptions = state => _.values(state.trivia.options)