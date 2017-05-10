import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'
import { getCategoryByUrlSlug } from 'canvas/catalog/selectors/categories'

export const getAllProducts = state => _.values(state.entities.products)
const getProductSlugByUrl = (state, props) => props.params.productSlug

export const getProductByUrlSlug = createSelector(
	getAllProducts,
	getProductSlugByUrl,
	(products, slug) => {
		return _.find(products, product => product.slug  == slug)
	}
)

export const getAllProductsByCategory = createSelector(
	getAllProducts,
	getCategoryByUrlSlug,
	(products, category) => {
		console.log('products', products)
		return _.filter(products, product => product.categoryIds.indexOf(`${category.id}`)  !== -1)
	}
)