const newApp = (
	state = {
		whoopsAlert: false,
		module: null,
		pageId: null,
		title: null,
	},
	action
) => {
	switch (action.type) {
		case 'NEW_APP/NOT_AVAILABLE':
			return {
				...state,
				whoopsAlert: true,
			}
		case 'NEW_APP/SET_MODULE':
			return {
				...state,
				whoopsAlert: false,
				module: action.payload.module,
			}
		case 'NEW_APP/SET_PAGE':
			return {
				...state,
				pageId: action.payload.pageId,
			}
		case 'NEW_APP/SET_TITLE':
			return {
				...state,
				title: action.payload.title,
			}
		default:
			return state
	}
}

export default newApp
