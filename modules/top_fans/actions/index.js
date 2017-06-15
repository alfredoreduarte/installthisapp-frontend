import { normalize } from 'normalizr'
import * as schema from 'modules/top_fans/schema'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivityUpdatingApp } from 'actions/activityIndicators'
import { updateApp } from 'actions/apps'
import { postToApi } from 'api'

export const editAppSpecificSettings = date => {
	return (dispatch, getState) => {
		const currentApp = getCurrentAppByState(getState())
		dispatch(updateApp(currentApp.checksum, {
			setting: {
				...currentApp.setting,
				firstFetchFromDate: date,
			}
		}))
	}
}

export const addIgnoredUserIdentifier = id => {
	return (dispatch, getState) => {
		dispatch(toggleActivityUpdatingApp())
		const currentApp = getCurrentAppByState(getState())
		return postToApi(
			`applications/${currentApp.checksum}/update_setting.json`, 
			{
				setting: {
					...currentApp.setting,
					ignoredUserIdentifiers: [ ...currentApp.setting.ignoredUserIdentifiers, id ]
				}
			}
		).then(response => {
			// const normalized = normalize(response, schema.app)
			dispatch(updateApp(currentApp.checksum, {
				setting: {
					...currentApp.setting,
					ignoredUserIdentifiers: [ ...currentApp.setting.ignoredUserIdentifiers, id ],
				}
			}))
			dispatch(toggleActivityUpdatingApp())
		})
	}
}