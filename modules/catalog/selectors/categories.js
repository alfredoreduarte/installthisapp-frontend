import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

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