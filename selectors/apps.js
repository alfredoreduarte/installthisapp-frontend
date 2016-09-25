import _ from 'lodash'
import { createSelector } from 'reselect'
import { stringContains } from 'lib/stringmatch'

export const getAllApps = (state, props) => {
	// return _.filter(_.values(state.entities.apps), app => app.status != 'deleted')
	const apps = _.filter(_.values(state.entities.apps), app => app.status != 'deleted')
	const appsWithPages = apps.map( app => {
		return { ...app, ...{fbPage: state.entities.pages[app.fbPageId]} }
	})
	return appsWithPages
}
export const getCurrentAppChecksum = (state, props) => props.params.checksum
export const getCurrentAppChecksumByState = state => state.admin.currentApp
const getFilterText = state => state.filterText
const appsSorterSelector = state => state.appsSorting
const getAppToBeDeletedChecksum = state => state.deleteApp.checksum

export const getCurrentApp = createSelector(
	getAllApps,
	getCurrentAppChecksum,
	(apps, checksum) => _.find(apps, app => app.checksum == checksum)
)

export const getCurrentAppByState = createSelector(
	getAllApps,
	getCurrentAppChecksumByState,
	(apps, checksum) => _.find(apps, app => app.checksum == checksum)
)

export const getAppToBeDeleted = createSelector(
	getAllApps,
	getAppToBeDeletedChecksum,
	(apps, checksum) => _.find(apps, app => app.checksum == checksum)
)

export const getAllAppsByText = createSelector(
	getAllApps,
	getFilterText,
	appsSorterSelector,
	(apps, text, appsSorting) => {
		const currentApps = _.values(apps).filter(app => stringContains(app.title, text))
		const order = appsSorting == 'updatedOn' ? 'desc' : 'asc'
		return _.orderBy(currentApps, appsSorting, order)
	}
)