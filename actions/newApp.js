export const setNewAppModule = module => ({
	type: 'NEW_APP/SET_MODULE',
	payload: {
		module
	}
})

export const setNewAppPage = pageId => ({
	type: 'NEW_APP/SET_PAGE',
	payload: {
		pageId
	}
})

export const setNewAppTitle = title => ({
	type: 'NEW_APP/SET_TITLE',
	payload: {
		title: title.trim()
	}
})