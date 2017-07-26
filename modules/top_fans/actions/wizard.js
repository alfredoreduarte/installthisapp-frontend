import { normalize } from 'normalizr'
import * as schema from 'modules/top_fans/schema'
import { getCurrentAppByState } from 'selectors/apps'
import { toggleActivityUpdatingApp } from 'actions/activityIndicators'
import { updateApp } from 'actions/apps'
import { postToApi } from 'api'

export const updateWizardStep = step => ({
	type: 'UPDATE_WIZARD_STEP',
	step,
})

export const setFbPageIdentifier = identifier => ({
	type: 'WIZARD_UPDATE_FB_PAGE',
	value: identifier,
})