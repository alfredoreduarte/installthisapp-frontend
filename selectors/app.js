import _ from 'lodash'
import { createSelector } from 'reselect'

const appsSelector = (state, props) => state.entities.apps
const currentAppChecksum = (state, props) => props.params.checksum

const appSelector = (apps, id = null) => {
	if (id) {
		return apps[id]
	}
	{
		return apps
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