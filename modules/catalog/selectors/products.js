import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllProducts = state => _.values(state.catalog.entities.products)

export const getFilteredProducts = createSelector(
	getAllProducts,
	getCurrentAppByState,
	(products, app) => {
		return _.filter(products, product => product.id > 0  && product.applicationId == app.id)
	}
)