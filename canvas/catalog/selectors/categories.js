import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

export const getAllCategories = state => _.values(state.entities.categories)