import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentApp } from 'selectors/apps'

const getAllProducts = state => _.values(state.catalog.entities.products)

export const getFilteredProducts = createSelector(
	getAllProducts,
	products => {
		return _.filter(products, product => product.id > 0)
	}
)