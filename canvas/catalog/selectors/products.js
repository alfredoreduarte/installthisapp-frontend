import _ from 'lodash'
import { createSelector } from 'reselect'

export const getAllProducts = state => _.values(state.entities.products)
const getProductSlugByUrl = (state, props) => props.params.productSlug

export const getProductByUrlSlug = createSelector(
	getAllProducts,
	getProductSlugByUrl,
	(products, slug) => _.find(products, product => product.slug == slug)
)