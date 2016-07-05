export const selectUser = id => ({
	type: 'SELECT_USER',
	id
})

export const sortUsersBy = key => ({
	type: 'SORT_USERS',
	payload: key
})