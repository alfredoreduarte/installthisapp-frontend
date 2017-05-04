import _ from 'lodash'
import { createSelector } from 'reselect'
import { getCurrentAppByState } from 'selectors/apps'
import { getCurrentProductByProps } from 'modules/catalog/selectors/products'

const getAllMedia = state => _.values(state.catalog.entities.media)

export const getFilteredMedia = createSelector(
	getAllMedia,
	getCurrentAppByState,
	(media, app) => {
		return _.filter(media, medium => {
			return medium.status != 'deleted' && medium.applicationId == app.id
		})
	}
)

export const getProductMedia = createSelector(
	getFilteredMedia,
	getCurrentProductByProps,
	(media, product) => {
		const galleryMediaIds = product.galleryMediaIds.map(id => parseInt(id))
		const filtered = _.filter(media, medium => {
			return galleryMediaIds.indexOf(medium.id) >= 0
		})
		return filtered
	}
)