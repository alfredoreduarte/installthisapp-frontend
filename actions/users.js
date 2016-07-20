export const selectItemOnTable = id => ({
	type: 'SELECT_ITEM',
	id
})

export const sortUsersBy = key => ({
	type: 'SORT_USERS',
	payload: key
})