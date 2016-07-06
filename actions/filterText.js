export const resetSearchText = () => ({
	type: 'CLEAR_FILTERTEXT'
})

export const searchText = payload => ({
	type: 'UPDATE_FILTERTEXT',
	payload
})