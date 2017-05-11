import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'
import { getProductByUrlSlug } from 'canvas/catalog/selectors/products'

export const getAllMedia = state => _.values(state.entities.media)

export const getProductMedia = createSelector(
	getAllMedia,
	getProductByUrlSlug,
	(media, product) => _.filter(media, medium => product.media.indexOf(medium.id) !== -1)
)