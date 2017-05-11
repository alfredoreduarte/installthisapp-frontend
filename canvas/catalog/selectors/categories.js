import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAllProducts, getProductByUrlSlug, coso } from 'canvas/catalog/selectors/products'

export const getAllCategories = state => _.values(state.entities.categories)

export const getCategorySlugByUrl = (state, props) => props.params.categorySlug

export const getCategoryByUrlSlug = createSelector(
	getAllCategories,
	getCategorySlugByUrl,
	(categories, slug) => {
		return _.find(categories, category => category.slug == slug)
	}
)

export const getProductCategories = createSelector(
	getAllCategories,
	getProductByUrlSlug,
	(categories, product) => _.filter(categories, category => product.categories.indexOf(category.id) !== -1)
)

export const getAllProductsByCategory = createSelector(
	getAllProducts,
	getCategoryByUrlSlug,
	(products, category) => {
		return _.filter(products, product => product.categories.indexOf(category.id)  !== -1)
	}
)