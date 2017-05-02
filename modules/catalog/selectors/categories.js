import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllCategories = state => _.values(state.catalog.entities.categories)

export const getFilteredCategories = createSelector(
	getAllCategories,
	getCurrentAppByState,
	(categories, app) => {
		return _.filter(categories, category => {
			return category.status != 'deleted' && category.applicationId == app.id
		})
	}
)