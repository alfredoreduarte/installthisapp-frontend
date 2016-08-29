export const turnOnActivityCreatingApp = () => ({
	type: 'TOGGLE_ACTIVITY_ON/CREATING_APP'
})

export const turnOffActivityCreatingApp = () => ({
	type: 'TOGGLE_ACTIVITY_OFF/CREATING_APP'
})

export const turnOnActivityLoadingApp = checksum => ({
	type: 'TOGGLE_ACTIVITY_ON/LOADING_APP',
	checksum
})

export const turnOffActivityLoadingApp = () => ({
	type: 'TOGGLE_ACTIVITY_OFF/LOADING_APP'
})

export const toggleActivityUpdatingAdmin = () => ({
	type: 'TOGGLE_ACTIVITY/UPDATING_ADMIN'
})

export const toggleActivityUpdatingAppSettings = () => ({
	type: 'TOGGLE_ACTIVITY/UPDATING_APP_SETTINGS'
})