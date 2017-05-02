import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllCategories = state => _.values(state.catalog.entities.categories)

export const getFilteredCategories = createSelector(
	getAllCategories,
	categories => {
		return _.filter(categories, category => category.id > 0)
	}
)