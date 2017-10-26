const appsSorting = (state = 'updatedOn', action) => {
  switch (action.type) {
    case 'SORT_APPS':
      return action.payload
    default:
      return state
  }
}

export default appsSorting
