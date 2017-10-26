export const selectItemOnTable = id => ({
  type: 'SELECT_ITEM',
  id,
})

// export const resetTableSelection = () => ({
// 	type: 'RESET_TABLE_SELECTION'
// })

export const sortUsersBy = key => ({
  type: 'SORT_USERS',
  payload: key,
})
