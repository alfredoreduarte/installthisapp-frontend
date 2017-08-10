import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAllPages } from 'selectors/pages'

export const getLeadforms = state => {
	return _.filter(state.admin.fbLeadforms, fbLeadform => !fbLeadform.deleted )
}

export const getLeadformsWithPages = createSelector(
	getAllPages,
	getLeadforms,
	(pages, fbLeadforms) => {
		return fbLeadforms.map(fbLeadform => {
			return {
				...fbLeadform,
				fbPageName: _.find(pages, {'identifier': fbLeadform.fbPageIdentifier}).name,
			}
		})
	}
)