const alerts = (state = {
	title: '',
	content: '',
}, action) => {
	switch (action.type) {
		case 'SET_ALERT':
			return { 
				...state,
				title: action.title,
				content: action.content,
			}
		default:
			return state
	}
}

export default alerts