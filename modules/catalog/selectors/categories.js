import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentAppByState } from 'selectors/apps'

const filterTextSelector = state => state.filterText
const getAllCategories = state => _.values(state.catalog.entities.categories)

export const getFilteredCategories = createSelector(
	getAllCategories,
	getCurrentAppByState,
	(categories, app) => {
		const unorderedArr = _.filter(categories, category => {
			return category.applicationId == app.id && category.status != 'deleted'
		})
		return _.orderBy(unorderedArr, ['lft', 'name'], ['asc', 'asc']);
	}
)

const categoriesByKeyword = (categories, text) => {
	return categories.filter(category => stringContains(category.name, text))
}

export const getCurrentCategoriesByKeyword = createSelector(
	getFilteredCategories,
	filterTextSelector,
	categoriesByKeyword
)