import { getCurrentAppByState } from 'selectors/apps'
import { updateApp } from 'actions/apps'

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