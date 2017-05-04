import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllCategories = state => _.values(state.catalog.entities.categories)

export const getFilteredCategories = createSelector(
	getAllCategories,
	getCurrentAppByState,
	(categories, app) => _.filter(categories, category => category.applicationId == app.id)
)