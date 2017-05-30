import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'
import { getCurrentAppByState } from 'selectors/apps'

const filterTextSelector = state => state.filterText
const getAllProducts = state => _.values(state.catalog.entities.products)
const getCurrentProductIdByProps = (state, props) => parseInt(props.params.productId)

export const getFilteredProducts = createSelector(
	getAllProducts,
	getCurrentAppByState,
	(products, app) => {
		return _.orderBy(_.filter(products, product => product.id > 0  && product.applicationId == app.id  && product.status !== 'deleted'), ['createdAt'], ['desc'])
	}
)

export const getCurrentProductByProps = createSelector(
	getAllProducts,
	getCurrentProductIdByProps,
	(products, id) => {
		return _.find(products, { id })
	}
)

const productsByKeyword = (products, text) => {
	return products.filter(product => stringContains(product.name, text))
}

export const getCurrentProductsByKeyword = createSelector(
	getFilteredProducts,
	filterTextSelector,
	productsByKeyword
)

export const getMostRequestedProducts = createSelector(
	getFilteredProducts,
	products => _.orderBy(products, ['messagesCount'], ['desc'])
)