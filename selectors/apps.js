import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'

export const getAllApps = (state, props) => _.values(state.entities.apps)
const getCurrentAppChecksum = (state, props) => props.params.checksum
const getFilterText = state => state.filterText

export const getCurrentApp = createSelector(
	getAllApps,
	getCurrentAppChecksum,
	(apps, checksum) => _.find(apps, app => app.checksum == checksum)
)

export const getAllAppsByText = createSelector(
	getAllApps,
	getFilterText,
	(apps, text) => _.values(apps).filter(app => stringContains(app.title, text))
)