import _ from 'lodash'
import { createSelector } from 'reselect'
import { getAllPages } from 'selectors/pages'
import { getLeadforms } from 'leadgen/selectors/fbLeadforms'
import { getEditingDestinationId } from 'leadgen/selectors/ui'

// export const getFbLeadDestinationSettings = state => state.fbLeadDestinations.settings

export const getFbLeadDestinations = state => {
	return _.filter(state.admin.fbLeadDestinations, fbLeadDestination => !fbLeadDestination.deleted )
}

export const getLeadDestinationsWithMetadata = createSelector(
	getFbLeadDestinations,
	getAllPages,
	getLeadforms,
	(destinations, pages, forms) => {
		return destinations.map(destination => {
			const form = _.find(forms, {'id': destination.fbLeadformId})
			return {
				...destination,
				fbPageIdentifier: form.fbPageIdentifier,
				fbPageName: _.find(pages, {'identifier': form.fbPageIdentifier}).name,
				fbFormId: form.fbFormId,
			}
		})
	}
)

export const getEditingDestination = createSelector(
	getLeadDestinationsWithMetadata,
	getEditingDestinationId,
	(destinations, id) => _.find(destinations, {'id': id})
)