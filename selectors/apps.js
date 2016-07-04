import _ from 'lodash'
import { stringContains } from '../lib/stringmatch'
import { createSelector } from 'reselect'

const appsSelector = (state, props) => state.entities.apps
const currentAppChecksum = (state, props) => props.params.checksum
const filterTextSelector = state => state.filterText

const appSelector = (apps, id = null) => {
	if (id) {
		return apps[id]
	}
	{
		return _.values(apps)
	}
}

export const getAllApps = createSelector(
	appsSelector,
	appSelector
)

export const getCurrentApp = createSelector(
	appsSelector,
	currentAppChecksum,
	appSelector
)

export const getAppsByText = createSelector(
	getAllApps,
	filterTextSelector,
	(apps, text) => _.values(apps).filter(app => stringContains(app.title, text))
)