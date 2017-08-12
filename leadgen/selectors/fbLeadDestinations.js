import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAllPages } from 'selectors/pages'

export const getFbLeadDestinationSettings = state => state.fbLeadDestinations.settings

// export const getFbLeadDestinations = state => state.admin.fbLeadDestinations
export const getFbLeadDestinations = state => {
	return _.filter(state.admin.fbLeadDestinations, fbLeadDestination => !fbLeadDestination.deleted )
}

// export const getLeadformsWithPages = createSelector(
// 	getAllPages,
// 	getLeadforms,
// 	(pages, fbLeadforms) => {
// 		return fbLeadforms.map(fbLeadform => {
// 			return {
// 				...fbLeadform,
// 				fbPageName: _.find(pages, {'identifier': fbLeadform.fbPageIdentifier}).name,
// 			}
// 		})
// 	}
// )