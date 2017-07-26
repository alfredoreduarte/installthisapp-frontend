import _ from 'lodash'
import { createSelector } from 'reselect'
import merge from 'lib/mergeCollections'
import { getAllPages } from 'selectors/pages'
import { getCurrentAppByState } from 'selectors/apps'
import { getAdminFbProfile } from 'selectors/admin'

const getWizardState = state => state.topFans.wizard

export const getCurrentStep = createSelector(
	getWizardState,
	getAdminFbProfile,
	(wizard, fbProfile) => {
		if (fbProfile) {
			return 1
		}
		else{
			return 0
		}
	}
)