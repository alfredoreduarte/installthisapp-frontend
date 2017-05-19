import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'

const getAllProducts = state => _.values(state.catalog.entities.products)
const getCurrentProductIdByProps = (state, props) => parseInt(props.params.productId)

export const getFilteredProducts = createSelector(
	getAllProducts,
	getCurrentAppByState,
	(products, app) => {
		return _.orderBy(_.filter(products, product => product.id > 0  && product.applicationId == app.id), ['createdAt'], ['desc'])
	}
)

export const getCurrentProductByProps = createSelector(
	getAllProducts,
	getCurrentProductIdByProps,
	(products, id) => {
		return _.find(products, { id })
	}
)