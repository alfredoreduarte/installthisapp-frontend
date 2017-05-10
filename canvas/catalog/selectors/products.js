import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

export const getAllProducts = state => _.values(state.entities.products)
const getProductSlugByUrl = (state, props) => props.params.productSlug

export const getProductByUrlSlug = createSelector(
	getAllProducts,
	getProductSlugByUrl,
	(products, slug) => {
		return _.find(products, product => product.slug  == slug)
	}
)