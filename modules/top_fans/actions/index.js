import 'isomorphic-fetch'
import downloadjs from 'downloadjs'
import { normalize } from 'normalizr'
import * as globalSchema from 'schema'
import * as schema from 'modules/top_fans/schema'
import { getCurrentAppByState } from 'selectors/apps'
import { receiveEntities } from 'actions/entities'
import { setAlert } from 'actions/alerts'
import { receiveAdmin } from 'actions/admin'
import { getEntriesForPage } from 'modules/top_fans/selectors/entries'
import { toggleActivityUpdatingApp } from 'actions/activityIndicators'
import { updateApp } from 'actions/apps'
import { postToApi, getFromApi } from 'api'

// CSV generator
export const generateCsv = () => {
	return ( dispatch, getState ) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const csvHeaders = ['identifier', 'name', 'likes', 'comments', 'score']
		const entries = getEntriesForPage(state)
		const arrayOfArrays = entries.map(entry => {
			return Object.values(entry)
		})
		const entriesWithHeaders = [ csvHeaders, ...arrayOfArrays ]
		console.log('entriesWithHeaders')
		console.log(entriesWithHeaders)
		fetch('/generate-csv', {
				method: 'POST',
				headers: {
					// 'Accept': 'application/json',
					// 'spy-user': spy,
					'Content-Type': 'application/json',
					// ...authKeys,
				},
				body: JSON.stringify({
					data: entriesWithHeaders
				}),
			})
			.then(function(resp) {
				return resp.blob();
			}).then(function(blob) {
				downloadjs(blob);
			})
			// .then(response => {
			// 	console.log(response)
			// })
			.catch(exception =>
				console.log('parsing failed', exception)
			)
	}
}
// CSV generator

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

export const subscribeToWebhook = checksum => {
	return ( dispatch, getState ) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const fbPageIdentifierForIntegration = state.admin.fbPageIdentifierForIntegration
		const checksum = currentApp.checksum
		return postToApi(`applications/${checksum}/subscribe_to_webhook.json`, {
			fbPageIdentifier: fbPageIdentifierForIntegration,
		}).then( response => {
			if (response.success == false) {
				window.scroll(0, 0)
				dispatch(setAlert(`<a href="?offer=app-limit-reached">Upgrade now to publish apps</a>.`, `You have reached the limit for free accounts.`))
				return false
			}
			else {
				const entities = {
					apps: response.applications,
					pages: response.pages,
				}
				const normalized = normalize(entities, globalSchema.entities)
				dispatch(receiveEntities(normalized.entities))
				// Sanitize admin user
				const admin = { ...response }
				delete admin.applications
				delete admin.pages
				return dispatch(receiveAdmin(admin))
			}
		})
	}
}

export const unsubscribeFromWebhook = checksum => {
	return ( dispatch, getState ) => {
		const state = getState()
		const currentApp = getCurrentAppByState(state)
		const checksum = currentApp.checksum
		return postToApi(`applications/${checksum}/unsubscribe_from_webhook.json`, null).then(response => {
			const entities = {
				apps: response.applications,
				pages: response.pages,
			}
			const normalized = normalize(entities, globalSchema.entities)
			dispatch(receiveEntities(normalized.entities))
			// Sanitize admin user
			const admin = { ...response }
			delete admin.applications
			delete admin.pages
			return dispatch(receiveAdmin(admin))
		})
	}
}