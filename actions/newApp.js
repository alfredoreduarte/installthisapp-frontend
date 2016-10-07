export const setNewAppModule = module => {
	analytics.track('Module selection', {
		module: module,
	})
	analytics.track('Feature used', {
		type: 'Choose module',
	})
	return {
		type: 'NEW_APP/SET_MODULE',
		payload: {
			module
		}
	}
}

export const setNewAppPage = pageId => {
	analytics.track('Feature used', {
		type: 'Choose page',
	})
	return {
		type: 'NEW_APP/SET_PAGE',
		payload: {
			pageId
		}
	}
}

export const setNewAppTitle = title => ({
	type: 'NEW_APP/SET_TITLE',
	payload: {
		title: title.trim()
	}
})