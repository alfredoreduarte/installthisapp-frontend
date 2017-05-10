import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

export const getAllCategories = state => _.values(state.entities.categories)

export const getCategorySlugByUrl = (state, props) => props.params.categorySlug

export const getCategoryByUrlSlug = createSelector(
	getAllCategories,
	getCategorySlugByUrl,
	(categories, slug) => {
		return _.find(categories, category => category.slug == slug)
	}
)