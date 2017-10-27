export const setAppNotAvailable = module => {
	analytics.track('Module Chosen', {
		module: module,
	})
	return {
		type: 'NEW_APP/NOT_AVAILABLE',
		payload: {
			module,
		},
	}
}

export const setNewAppModule = module => {
	analytics.track('Module Chosen', {
		module: module,
	})
	return {
		type: 'NEW_APP/SET_MODULE',
		payload: {
			module,
		},
	}
}

export const setNewAppPage = pageId => {
	return {
		type: 'NEW_APP/SET_PAGE',
		payload: {
			pageId,
		},
	}
}

export const setNewAppTitle = title => ({
	type: 'NEW_APP/SET_TITLE',
	payload: {
		title: title.trim(),
	},
})
