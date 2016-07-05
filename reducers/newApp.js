const newApp = (state = {
	module: null,
	pageId: null,
	title: null,
}, action) => {
	switch (action.type) {
		case 'NEW_APP/SET_MODULE':
			return Object.assign({}, state, {
				module: action.payload.module
			})
		case 'NEW_APP/SET_PAGE':
			return Object.assign({}, state, {
				pageId: action.payload.pageId
			})
		case 'NEW_APP/SET_TITLE':
			return Object.assign({}, state, {
				title: action.payload.title
			})
		default:
			return state
	}
}

export default newApp