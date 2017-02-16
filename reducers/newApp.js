const newApp = (state = {
	whoopsAlert: false,
	module: null,
	pageId: null,
	title: null,
}, action) => {
	switch (action.type) {
		case 'NEW_APP/SET_MODULE':
			switch (action.payload.module) {
				case 'memory_match':
				case 'forms':
				case 'puzzle':
				case 'trivia':
				case 'photo_contest':
					return Object.assign({}, state, {
						whoopsAlert: true,
					})
					break
				case 'top_fans':
					return Object.assign({}, state, {
						whoopsAlert: false,
						module: action.payload.module
					})
			}
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